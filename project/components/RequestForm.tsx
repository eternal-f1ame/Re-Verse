"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles/RequestForm.module.css";

interface RequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestForm({ isOpen, onClose }: RequestFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    researchPurpose: "",
  });
  const [termsAccepted, setTermsAccepted] = useState({
    license: false,
    accredit: false,
    usage: false,
    redistribute: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [geminiLoading, setGeminiLoading] = useState(false);

  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbx29cj3FzS2_HmZ6z0B5Ga3mNMXEjyG-IyXUAIj89RjBLl-tQUkzuAW3E8iZn58qWwo/exec';

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: "",
        email: "",
        organization: "",
        researchPurpose: "",
      });
      setTermsAccepted({
        license: false,
        accredit: false,
        usage: false,
        redistribute: false,
      });
      setShowSuccess(false);
      setError("");
      setGeminiLoading(false);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTermsAccepted(prev => ({ ...prev, [name]: checked }));
  };

  const handleGeminiSuggest = async () => {
    if (!formData.researchPurpose.trim()) return;

    setGeminiLoading(true);
    setError("");

    try {
      const prompt = `Based on the following user research idea, please expand it into a formal, well-structured research abstract of about 150-200 words. The abstract should be suitable for a dataset access request. It must explicitly mention the intent to use the "Re:Verse Dataset" for the analysis. User's idea: "${formData.researchPurpose.trim()}"`;
      
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = ""; // API key will be automatically provided by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const generatedText = result.candidates[0].content.parts[0].text;
        setFormData(prev => ({ ...prev, researchPurpose: generatedText }));
      } else {
        throw new Error('Unexpected response format from API.');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      setError('Could not generate suggestion. Please try again later.');
    } finally {
      setGeminiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    const errors: string[] = [];
    if (!formData.fullName.trim()) errors.push('Full Name is required.');
    if (!formData.email.trim()) errors.push('Email Address is required.');
    if (!formData.organization.trim()) errors.push('Organisation is required.');
    if (!formData.researchPurpose.trim()) errors.push('Research purpose is required.');
    
    const allTermsAccepted = Object.values(termsAccepted).every(term => term === true);
    if (!allTermsAccepted) errors.push('You must agree to all terms and conditions.');

    if (errors.length > 0) {
      setError(errors.join(' '));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(googleScriptUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      });

      const data = await response.json();
      
      if (data.result === 'success') {
        setShowSuccess(true);
      } else {
        throw new Error(data.error || 'Unknown error occurred.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setError('Could not submit the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
          <div className={styles.successMessage}>
            <h3 className={styles.successTitle}>Thank You!</h3>
            <p>Your request for the Re:Verse Dataset has been submitted successfully. We will review your application and contact you via email within 5-7 business days.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <Image
              src="/favicon.png"
              alt="Re:Verse Mascot"
              width={60}
              height={60}
              className={styles.headerImage}
            />
            <div>
              <h1 className={styles.headerTitle}>Re:Verse Dataset</h1>
              <p className={styles.headerSubtitle}>Access Request Form</p>
            </div>
          </div>

          <div className={styles.formBody}>
            <p className={styles.description}>
              Please fill out this form to request access to the Re:Verse Dataset. Access is granted for non-commercial research purposes only. Ensure all information is accurate.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Requester Information Section */}
              <div className={styles.formSection}>
                <div className={styles.mangaDeco} style={{ top: '-25px', right: '-25px', transform: 'rotate(15deg)' }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L61.226 34.5492L97.5528 38.7742L71.2764 65.4508L77.6338 100L50 82L22.3662 100L28.7236 65.4508L2.44717 38.7742L38.774 34.5492L50 0Z" fill="black"/>
                  </svg>
                </div>
                <h2 className={styles.sectionTitle}>Requester Information</h2>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName" className={styles.inputLabel}>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="e.g., Sasuke Uchiha"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="e.g., sasuke.uchiha@example.com"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="organization" className={styles.inputLabel}>
                    Organisation / Institution <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="e.g., University of Akatsuki Studies"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <div className={styles.textareaHeader}>
                    <label htmlFor="researchPurpose" className={styles.inputLabel}>
                      Briefly describe your research purpose <span className={styles.required}>*</span>
                    </label>
                  </div>
                  <textarea
                    id="researchPurpose"
                    name="researchPurpose"
                    value={formData.researchPurpose}
                    onChange={handleInputChange}
                    rows={5}
                    className={styles.formInput}
                    required
                    placeholder="e.g., Analyzing chakra consumption in perfecting Susanoo techniques."
                  />
                  {geminiLoading && (
                    <div className={styles.geminiLoader}>
                      <span className={styles.loaderText}>Generating...</span>
                      <div className={styles.loader}></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms and Conditions Section */}
              <div className={styles.formSection}>
                <div className={styles.mangaDeco} style={{ bottom: '-30px', left: '-35px', transform: 'rotate(-25deg)' }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 49.8615L98 2M2 49.8615L50.2769 98L2 49.8615Z" stroke="black" strokeWidth="4"/>
                  </svg>
                </div>
                <h2 className={styles.sectionTitle}>Terms and Conditions</h2>
                <p className={styles.termsDescription}>
                  Please read and agree to the following terms to proceed.
                </p>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="terms-license"
                    name="license"
                    checked={termsAccepted.license}
                    onChange={handleTermsChange}
                    className={styles.formCheckbox}
                    required
                  />
                  <label htmlFor="terms-license" className={styles.checkboxLabel}>
                    I agree to the licensing terms of the Re:Zero - Starting Life in Another World manga and associated media.
                  </label>
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="terms-accredit"
                    name="accredit"
                    checked={termsAccepted.accredit}
                    onChange={handleTermsChange}
                    className={styles.formCheckbox}
                    required
                  />
                  <label htmlFor="terms-accredit" className={styles.checkboxLabel}>
                    I agree to credit{' '}
                    <a href="https://yenpress.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                      Yen Press
                    </a>
                    , the official English publisher of the Re:Zero franchise, in any work (inclusive of but not limited to publications or presentations) resulting from this research or any of its derivatives.
                  </label>
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="terms-usage"
                    name="usage"
                    checked={termsAccepted.usage}
                    onChange={handleTermsChange}
                    className={styles.formCheckbox}
                    required
                  />
                  <label htmlFor="terms-usage" className={styles.checkboxLabel}>
                    I agree to use the Re:Verse Dataset for <strong>non-commercial and research purposes only</strong>.
                  </label>
                </div>

                <div className={styles.checkboxGroup}>
                  <input
                    type="checkbox"
                    id="terms-redistribute"
                    name="redistribute"
                    checked={termsAccepted.redistribute}
                    onChange={handleTermsChange}
                    className={styles.formCheckbox}
                    required
                  />
                  <label htmlFor="terms-redistribute" className={styles.checkboxLabel}>
                    I agree <strong>not to redistribute, share, or make the Re:Verse Dataset publicly available</strong> in any form.
                  </label>
                </div>
              </div>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>

              {isSubmitting && (
                <div className={styles.submitLoader}>
                  <div className={styles.loader}></div>
                  <p className={styles.loaderText}>Submitting to Google Sheet...</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
