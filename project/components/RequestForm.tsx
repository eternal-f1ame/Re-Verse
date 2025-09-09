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
      const prompt = `Based on the following collaboration idea, please expand it into a formal, well-structured research proposal of about 150-200 words. The proposal should be suitable for joining the Re:Verse research project as a collaborator. It should explicitly mention how this contribution would advance the Re:Verse project goals. User's idea: "${formData.researchPurpose.trim()}"`;
      
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
    if (!formData.researchPurpose.trim()) errors.push('Collaboration contribution is required.');
    
    const allTermsAccepted = Object.values(termsAccepted).every(term => term === true);
    if (!allTermsAccepted) errors.push('You must agree to all collaboration terms.');

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
      setError('Could not submit the collaboration request. Please try again later.');
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
            <h3 className={styles.successTitle}>Welcome to the Team!</h3>
            <p>Your collaboration request has been submitted successfully. We're excited about the possibility of working together! We will review your proposal and reach out via email within 5-7 business days to discuss next steps.</p>
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
              <h1 className={styles.headerTitle}>Re:Verse Collaboration</h1>
              <p className={styles.headerSubtitle}>Join Our Research Team</p>
            </div>
          </div>

          <div className={styles.formBody}>
            <p className={styles.description}>
              We're excited to collaborate with researchers who share our passion for advancing Vision Language Models and sequential visual storytelling. Please fill out this form to join our research efforts and contribute to the Re:Verse project.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Requester Information Section */}
              <div className={styles.formSection}>
                <div className={styles.mangaDeco} style={{ top: '-25px', right: '-25px', transform: 'rotate(15deg)' }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0L61.226 34.5492L97.5528 38.7742L71.2764 65.4508L77.6338 100L50 82L22.3662 100L28.7236 65.4508L2.44717 38.7742L38.774 34.5492L50 0Z" fill="black"/>
                  </svg>
                </div>
                <h2 className={styles.sectionTitle}>Collaborator Information</h2>
                
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
                      How would you like to contribute to the Re:Verse project? <span className={styles.required}>*</span>
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
                    placeholder="e.g., I'd like to contribute by developing new forms of chakra harnessing for Chidori."
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
                <h2 className={styles.sectionTitle}>Collaboration Agreement</h2>
                <p className={styles.termsDescription}>
                  Please read and agree to the following collaboration terms.
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
                    I understand and agree to respect the licensing terms of the Re:Zero - Starting Life in Another World manga and associated media in our collaborative work.
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
                    I agree to properly credit{' '}
                    <a href="https://yenpress.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                      Yen Press
                    </a>
                    , the official English publisher of the Re:Zero franchise, and all Re:Verse project contributors in any collaborative publications or presentations.
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
                    I commit to using any shared Re:Verse resources for <strong>non-commercial and collaborative research purposes only</strong>.
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
                    I agree to follow the project's data sharing guidelines and <strong>not to redistribute sensitive research materials</strong> without explicit permission from the Re:Verse team.
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
                {isSubmitting ? 'Submitting...' : 'Join Collaboration'}
              </button>

              {isSubmitting && (
                <div className={styles.submitLoader}>
                  <div className={styles.loader}></div>
                  <p className={styles.loaderText}>Submitting collaboration request...</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
