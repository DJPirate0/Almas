import React, { useState, useEffect } from 'react';
import { Check, Send, Trash2, AlertCircle, MessageSquare, Mail, Copy, CheckCircle2, ArrowRight, Sparkles, Clock, Globe, Briefcase, Loader2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, SelectedOption, OrderRequest, ServiceOption } from '../types';

interface EstimatorProps {
  services: Service[];
  selectedServiceId: string;
  onServiceChange: (id: string) => void;
  onInquirySubmitted: (inquiry: OrderRequest) => void;
  onViewChange?: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
}

const STUDIO_EMAIL = 'info.almaas.studio@gmail.com';
const STUDIO_PHONE = '923261867468';

export default function Estimator({ services, selectedServiceId, onServiceChange, onInquirySubmitted, onViewChange }: EstimatorProps) {
  // Finds current active service
  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

  // Selected options state
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  // Client order details state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [preferredTimeline, setPreferredTimeline] = useState('1-2 weeks');
  const [budgetPreference, setBudgetPreference] = useState('Standard / Flexible');
  
  // UI & submission states
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrderRequest | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Auto-fill default option if none is selected for active service to guide the client
  useEffect(() => {
    const activeSelections = selectedOptions.filter(o => o.serviceId === activeService.id);
    if (activeSelections.length === 0 && activeService.categories.length > 0) {
      const firstOpt = activeService.categories[0].options[0];
      if (firstOpt) {
        setSelectedOptions(prev => {
          const exists = prev.some(
            o => o.serviceId === activeService.id && o.categoryId === activeService.categories[0].id && o.optionId === firstOpt.id
          );
          if (exists) return prev;
          return [
            ...prev, 
            { 
              serviceId: activeService.id, 
              categoryId: activeService.categories[0].id, 
              optionId: firstOpt.id 
            }
          ];
        });
      }
    }
  }, [activeService]);

  // Handle toggling option selection
  const handleToggleOption = (categoryId: string, option: ServiceOption) => {
    const exists = selectedOptions.some(
      o => o.serviceId === activeService.id && o.categoryId === categoryId && o.optionId === option.id
    );

    if (exists) {
      setSelectedOptions(prev => prev.filter(
        o => !(o.serviceId === activeService.id && o.categoryId === categoryId && o.optionId === option.id)
      ));
    } else {
      setSelectedOptions(prev => [
        ...prev,
        {
          serviceId: activeService.id,
          categoryId: categoryId,
          optionId: option.id
        }
      ]);
    }
  };

  // Clean selections for active service
  const handleClearActiveServiceSelections = () => {
    setSelectedOptions(prev => prev.filter(o => o.serviceId !== activeService.id));
  };

  // Get selected options details
  const getSelectedItemsDetails = () => {
    return selectedOptions
      .filter(o => o.serviceId === activeService.id)
      .map(sel => {
        const category = activeService.categories.find(c => c.id === sel.categoryId);
        const option = category?.options.find(opt => opt.id === sel.optionId);

        return {
          optionId: sel.optionId,
          name: option?.name || '',
          categoryName: category?.name || '',
          description: option?.description || ''
        };
      });
  };

  const selectedItemsDetails = getSelectedItemsDetails();

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!clientName.trim()) errors.name = 'Please provide your name';
    if (!clientEmail.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!projectDescription.trim()) {
      errors.description = 'Please describe what and how you want this project built';
    } else if (projectDescription.trim().length < 10) {
      errors.description = 'Please provide a few more details so we can best understand your goals';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Build summary text for clipboard or WhatsApp
  const buildSummaryText = (order: OrderRequest) => {
    let body = `Almas Studio Project Request\n`;
    body += `Order ID: ${order.id}\n`;
    body += `Service: ${order.serviceName}\n\n`;
    body += `Client: ${order.clientName}\n`;
    body += `Email: ${order.clientEmail}\n`;
    if (order.clientPhone) body += `Phone: ${order.clientPhone}\n`;
    if (order.preferredTimeline) body += `Timeline: ${order.preferredTimeline}\n`;
    if (order.budgetPreference) body += `Scope Preference: ${order.budgetPreference}\n`;
    body += `\n`;

    if (order.selectedOptions && order.selectedOptions.length > 0) {
      body += `Selected Modules:\n`;
      order.selectedOptions.forEach((opt, idx) => {
        body += `${idx + 1}. [${opt.categoryName}] ${opt.optionName}\n`;
      });
      body += `\n`;
    }

    body += `Project Requirements:\n`;
    body += `${order.projectDescription}\n`;
    return body;
  };

  // Submit Order handler: sends automatically in the background to info.almaas.studio@gmail.com
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    setFormErrors({});

    const orderId = `ALM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderRequest = {
      id: orderId,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || undefined,
      serviceId: activeService.id,
      serviceName: activeService.name,
      projectDescription: projectDescription.trim(),
      preferredTimeline,
      budgetPreference,
      selectedOptions: selectedItemsDetails.map(item => ({
        optionId: item.optionId,
        optionName: item.name,
        categoryName: item.categoryName
      })),
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };

    // Save locally
    onInquirySubmitted(newOrder);

    // Auto-send in background directly to info.almaas.studio@gmail.com
    try {
      await fetch(`https://formsubmit.co/ajax/${STUDIO_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Project Request: ${newOrder.serviceName} - ${newOrder.clientName} [${orderId}]`,
          _template: 'table',
          _captcha: 'false',
          'Order ID': orderId,
          'Client Name': newOrder.clientName,
          'Client Email': newOrder.clientEmail,
          'Client Phone': newOrder.clientPhone || 'Not provided',
          'Service': newOrder.serviceName,
          'Timeline': newOrder.preferredTimeline || 'Flexible',
          'Scope Preference': newOrder.budgetPreference || 'Standard',
          'Selected Modules': newOrder.selectedOptions.map(o => `[${o.categoryName}] ${o.optionName}`).join(', ') || 'None selected',
          'Requirements (What & How)': newOrder.projectDescription
        })
      });
    } catch (err) {
      console.warn('Direct auto-dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedOrder(newOrder);
      setIsSuccess(true);
    }
  };

  // Direct WhatsApp contact with pre-filled details for instant detailing
  const handleWhatsAppChat = () => {
    if (!submittedOrder) return;
    
    let message = `Hello Almas Studio!\n\n`;
    message += `I just submitted a project request for *${submittedOrder.serviceName}* (Order ID: *${submittedOrder.id}*).\n\n`;
    message += `*Client Name:* ${submittedOrder.clientName}\n`;
    message += `*Email:* ${submittedOrder.clientEmail}\n`;
    if (submittedOrder.clientPhone) message += `*Phone:* ${submittedOrder.clientPhone}\n`;
    if (submittedOrder.preferredTimeline) message += `*Timeline:* ${submittedOrder.preferredTimeline}\n`;
    
    if (submittedOrder.selectedOptions.length > 0) {
      message += `\n*Selected Modules:*\n`;
      submittedOrder.selectedOptions.forEach((item, index) => {
        message += `${index + 1}. _${item.optionName}_\n`;
      });
    }

    message += `\n*Project Vision & Requirements:*\n"${submittedOrder.projectDescription}"\n\n`;
    message += `I'd like to discuss the next steps and project kickoff with you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Copy order summary to clipboard
  const handleCopyOrderSummary = () => {
    if (!submittedOrder) return;
    const text = buildSummaryText(submittedOrder);
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Reset form
  const handleReset = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setProjectDescription('');
    setFormErrors({});
    setIsSuccess(false);
    setSubmittedOrder(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-text-app min-h-screen pb-24 max-w-7xl mx-auto px-6 lg:px-12 pt-12 overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.08] blur-[120px] pointer-events-none" />

      {/* Page Title & Service Tab Toggles */}
      <section className="mb-10 border-b border-border-app pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim block mb-2">Commission & Order</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight text-text-app">Request a Project</h1>
          </div>
          <p className="text-text-muted text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Fill in your requirements below. Your request is <strong className="text-text-app font-medium">automatically sent to {STUDIO_EMAIL}</strong> upon clicking submit.
          </p>
        </div>
        
        {/* Service Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {services.map((service) => {
            const isActive = activeService.id === service.id;
            return (
              <button
                key={service.id}
                id={`tab-${service.id}`}
                onClick={() => {
                  onServiceChange(service.id);
                  setFormErrors({});
                }}
                className={`relative py-3 px-3.5 rounded-sm text-xs font-mono uppercase tracking-wider text-center border transition-all duration-200 cursor-pointer focus:outline-none overflow-hidden ${
                  isActive
                    ? 'bg-text-app text-bg-app border-text-app font-semibold shadow-sm'
                    : 'bg-transparent text-text-muted border-border-app hover:text-text-app hover:border-border-app-hover'
                }`}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {isSuccess && submittedOrder ? (
          /* SUCCESS CONFIRMATION INTERFACE WITH WHATSAPP DETAILING OPTION */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto border border-border-app bg-card-bg p-5 sm:p-8 md:p-10 rounded-sm text-center shadow-xl relative"
            id="success-screen"
          >
            {/* Success Check Badge */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-md">
              <Check className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </div>
            
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold block mb-1.5">
              ✓ Request Automatically Sent to Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans tracking-tight mb-1.5 text-text-app">Thank you, {submittedOrder.clientName}!</h2>
            <p className="text-text-dim font-mono text-xs mb-6">Order Reference: <span className="text-text-app font-medium">{submittedOrder.id}</span></p>

            {/* Direct Delivery Notice */}
            <div className="bg-bg-app border border-border-app rounded-sm p-4 sm:p-5 text-left mb-6 max-w-lg mx-auto shadow-inner">
              {/* Clean Structured Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-app pb-3.5 mb-3.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono text-text-dim uppercase tracking-wider leading-tight">Delivered To</span>
                    <span className="text-xs font-mono font-medium text-text-app break-all sm:break-normal">{STUDIO_EMAIL}</span>
                  </div>
                </div>
                
                <div className="self-start sm:self-center shrink-0">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-card-bg border border-border-app text-[10px] font-mono text-text-app uppercase tracking-wider font-medium">
                    {submittedOrder.serviceName}
                  </span>
                </div>
              </div>

              {submittedOrder.selectedOptions.length > 0 && (
                <div className="mb-3">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-text-dim block mb-1.5">Selected Modules:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {submittedOrder.selectedOptions.map((opt, i) => (
                      <span key={i} className="text-[11px] bg-card-bg border border-border-app text-text-muted px-2 py-0.5 rounded-sm">
                        {opt.optionName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-text-dim block mb-1">Your Requirements:</span>
                <p className="text-xs text-text-muted font-light leading-relaxed bg-card-bg/60 p-3 rounded-sm border border-border-app/60 max-h-28 overflow-y-auto custom-scrollbar">
                  {submittedOrder.projectDescription}
                </p>
              </div>
            </div>

            {/* PROMINENT WHATSAPP ACTION FOR FURTHER DETAILING */}
            <div className="p-5 sm:p-6 bg-card-bg-solid border border-border-app rounded-sm max-w-lg mx-auto mb-6 text-left shadow-sm">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-9 h-9 rounded-sm bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-sans font-medium text-text-app">Want faster response & real-time discussion?</h3>
                  <p className="text-xs text-text-muted font-light mt-0.5 leading-relaxed">
                    Contact us directly on WhatsApp to share reference files, discuss specific features, or begin project kickoff immediately.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppChat}
                id="contact-whatsapp-btn"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] tracking-widest uppercase font-semibold rounded-sm cursor-pointer flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Us on WhatsApp (+92 326 1867468)
              </motion.button>
            </div>

            {/* Secondary actions */}
            <div className="flex items-center justify-center gap-4 max-w-md mx-auto mb-4">
              <button
                onClick={handleCopyOrderSummary}
                className="py-2 text-[10px] font-mono text-text-dim hover:text-text-app transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedNotification ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedNotification ? 'Copied Details!' : 'Copy Summary'}
              </button>

              {onViewChange && (
                <button
                  onClick={() => onViewChange('inquiries')}
                  className="py-2 text-[10px] font-mono text-text-dim hover:text-text-app transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3 h-3" />
                  View in My Orders
                </button>
              )}
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-mono text-text-dim hover:text-text-app underline uppercase tracking-wider cursor-pointer mt-2"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          /* MAIN SERVICE ORDER FORM INTERFACE */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start" 
            id="order-workspace"
          >
            
            {/* Left Column: Scope & Feature Module Selectors */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border-app pb-3.5">
                <div>
                  <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest block">Selected Service</span>
                  <h2 className="text-lg sm:text-xl font-sans font-medium text-text-app">{activeService.name}</h2>
                </div>
                {selectedItemsDetails.length > 0 && (
                  <button
                    onClick={handleClearActiveServiceSelections}
                    id="clear-selections"
                    className="text-xs font-mono text-text-dim hover:text-text-app flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Modules
                  </button>
                )}
              </div>

              {/* Active Service Banner */}
              {activeService.imageRef && (
                <div className="h-24 w-full rounded-sm overflow-hidden border border-border-app relative flex items-center p-5 bg-card-bg shadow-sm">
                  <img 
                    src={activeService.imageRef} 
                    alt={activeService.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] contrast-[1.05] brightness-[0.9] dark:brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-bg-app/95 via-bg-app/80 to-bg-app/30 dark:from-bg-app/95 dark:via-bg-app/85 dark:to-bg-app/50" />
                  <div className="relative z-10 max-w-md">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-text-dim block mb-0.5">Service Profile</span>
                    <p className="text-text-app text-xs font-light line-clamp-2">
                      {activeService.shortDescription}
                    </p>
                  </div>
                </div>
              )}

              {/* Service Categories & Feature Options */}
              <div className="flex flex-col gap-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-dim">
                  Select Modules or Deliverables (Optional)
                </span>
                
                {activeService.categories.map((category) => (
                  <div key={category.id} className="border border-border-app/60 bg-card-bg p-5 rounded-sm">
                    <h3 className="text-sm font-sans font-medium mb-1 text-text-app">{category.name}</h3>
                    <p className="text-text-muted text-xs font-light mb-4 leading-relaxed">{category.description}</p>
                    
                    <div className="flex flex-col gap-2.5">
                      {category.options.map((option) => {
                        const isChecked = selectedOptions.some(
                          o => o.serviceId === activeService.id && o.categoryId === category.id && o.optionId === option.id
                        );

                        return (
                          <div 
                            key={option.id}
                            onClick={() => handleToggleOption(category.id, option)}
                            id={`opt-${option.id}`}
                            className={`border rounded-sm p-3.5 flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                              isChecked
                                ? 'bg-card-bg-solid border-text-app text-text-app shadow-sm'
                                : 'bg-card-bg/30 border-border-app text-text-muted hover:bg-card-bg hover:text-text-app'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-sm border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-text-app border-text-app text-bg-app'
                                : 'border-border-app bg-bg-app'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>

                            <div className="flex-1">
                              <span className="text-xs font-medium font-sans block">{option.name}</span>
                              <p className="text-[11px] text-text-muted font-light leading-relaxed mt-0.5">{option.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: The Order & Requirement Form */}
            <div className="lg:col-span-6 flex flex-col gap-6 lg:sticky lg:top-24">
              
              <div className="border border-border-app bg-card-bg p-6 sm:p-7 rounded-sm shadow-md">
                <div className="border-b border-border-app pb-4 mb-5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-text-dim block">Instant Studio Dispatch</span>
                  <h3 className="text-lg font-sans font-medium text-text-app">Tell Us What & How You Want It</h3>
                  <p className="text-xs text-text-muted font-light mt-1">
                    Submitted requests are automatically delivered to <span className="font-mono text-text-app font-medium">{STUDIO_EMAIL}</span>.
                  </p>
                </div>

                <form onSubmit={handleSubmitOrder} className="flex flex-col gap-4">
                  {formErrors.general && (
                    <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-400 text-xs rounded-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formErrors.general}</span>
                    </div>
                  )}

                  {/* Client Name */}
                  <div>
                    <label htmlFor="client-name" className="text-[10px] font-mono uppercase tracking-widest text-text-dim block mb-1.5">
                      Your Name / Company *
                    </label>
                    <input
                      type="text"
                      id="client-name"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Alex Morgan / Studio Apex"
                      className={`w-full bg-bg-app border text-xs text-text-app px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-text-app transition-all ${
                        formErrors.name ? 'border-red-900/60' : 'border-border-app'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-red-400 text-[9px] font-mono mt-1 block">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Client Email */}
                  <div>
                    <label htmlFor="client-email" className="text-[10px] font-mono uppercase tracking-widest text-text-dim block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="client-email"
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                        if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="alex@company.com"
                      className={`w-full bg-bg-app border text-xs text-text-app px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-text-app transition-all ${
                        formErrors.email ? 'border-red-900/60' : 'border-border-app'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-red-400 text-[9px] font-mono mt-1 block">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label htmlFor="client-phone" className="text-[10px] font-mono uppercase tracking-widest text-text-dim block mb-1.5">
                      WhatsApp / Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      id="client-phone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+92 326 1867468"
                      className="w-full bg-bg-app border border-border-app text-xs text-text-app px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-text-app transition-all"
                    />
                  </div>

                  {/* Preferred Timeline & Budget Flexibility */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="preferred-timeline" className="text-[10px] font-mono uppercase tracking-widest text-text-dim block mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        id="preferred-timeline"
                        value={preferredTimeline}
                        onChange={(e) => setPreferredTimeline(e.target.value)}
                        className="w-full bg-bg-app border border-border-app text-xs text-text-app px-3 py-2.5 rounded-sm focus:outline-none focus:border-text-app transition-all cursor-pointer font-sans"
                      >
                        <option value="Urgent (1–3 days)">Urgent (1–3 days)</option>
                        <option value="1–2 weeks">1–2 weeks</option>
                        <option value="2–4 weeks">2–4 weeks</option>
                        <option value="Monthly / Ongoing">Monthly / Ongoing</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget-preference" className="text-[10px] font-mono uppercase tracking-widest text-text-dim block mb-1.5">
                        Scope Preference
                      </label>
                      <select
                        id="budget-preference"
                        value={budgetPreference}
                        onChange={(e) => setBudgetPreference(e.target.value)}
                        className="w-full bg-bg-app border border-border-app text-xs text-text-app px-3 py-2.5 rounded-sm focus:outline-none focus:border-text-app transition-all cursor-pointer font-sans"
                      >
                        <option value="Standard / Flexible">Standard / Flexible</option>
                        <option value="Startup / Compact">Startup / Compact</option>
                        <option value="Enterprise / Full Suite">Enterprise / Full Suite</option>
                        <option value="Let's Discuss">Let's Discuss</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description & How You Want It */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="project-description" className="text-[10px] font-mono uppercase tracking-widest text-text-dim block">
                        What or How You Want It *
                      </label>
                      <span className="text-[9px] font-mono text-text-dim">Be as specific as you like</span>
                    </div>
                    <textarea
                      id="project-description"
                      value={projectDescription}
                      onChange={(e) => {
                        setProjectDescription(e.target.value);
                        if (formErrors.description) setFormErrors(prev => ({ ...prev, description: '' }));
                      }}
                      placeholder="Describe your vision, target audience, specific features, style references (e.g. minimalist dark theme, fast animations), or any inspirations..."
                      rows={5}
                      className={`w-full bg-bg-app border text-xs text-text-app p-3.5 rounded-sm focus:outline-none focus:border-text-app transition-all resize-none font-light leading-relaxed ${
                        formErrors.description ? 'border-red-900/60' : 'border-border-app'
                      }`}
                    />
                    {formErrors.description && (
                      <span className="text-red-400 text-[9px] font-mono mt-1 block">{formErrors.description}</span>
                    )}
                  </div>

                  {/* Selected Modules preview chips */}
                  {selectedItemsDetails.length > 0 && (
                    <div className="p-3 bg-bg-app border border-border-app rounded-sm">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-dim block mb-1.5">Included modules:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedItemsDetails.map(item => (
                          <span key={item.optionId} className="text-[10px] font-mono bg-card-bg border border-border-app px-2 py-0.5 rounded-sm text-text-app">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit CTA button */}
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-order-btn"
                    className="w-full py-3.5 mt-2 bg-text-app text-bg-app font-mono text-[11px] tracking-widest uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2 shadow-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sending Request to Studio...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Request to info.almaas.studio@gmail.com
                      </>
                    )}
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-text-dim mt-1">
                    <Mail className="w-3 h-3" />
                    <span>Automatically delivered directly to studio inbox</span>
                  </div>

                </form>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
