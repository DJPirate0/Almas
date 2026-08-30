import React from 'react';
import { Trash2, MessageSquare, Calendar, ChevronRight, FolderOpen, Mail, Phone, Clock, FileText, Send, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderRequest } from '../types';

interface InquiriesProps {
  inquiries: OrderRequest[];
  onDeleteInquiry: (id: string) => void;
  onViewChange: (view: 'home' | 'showcase' | 'estimator' | 'inquiries') => void;
}

const STUDIO_EMAIL = 'info.almaas.studio@gmail.com';
const STUDIO_PHONE = '923261867468';

export default function Inquiries({ inquiries, onDeleteInquiry, onViewChange }: InquiriesProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Format dates
  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  // Re-open WhatsApp chat for a specific saved order
  const handleWhatsAppForOrder = (order: OrderRequest) => {
    let message = `Hello Almas Studio!\n\n`;
    message += `I want to discuss my order: *${order.id}* for *${order.serviceName}*.\n\n`;
    
    if (order.selectedOptions && order.selectedOptions.length > 0) {
      message += `*Selected Modules:*\n`;
      order.selectedOptions.forEach((item, index) => {
        message += `${index + 1}. _${item.optionName}_\n`;
      });
      message += `\n`;
    }

    message += `*Client:* ${order.clientName} (${order.clientEmail})\n`;
    if (order.clientPhone) message += `*Phone:* ${order.clientPhone}\n`;
    if (order.preferredTimeline) message += `*Timeline:* ${order.preferredTimeline}\n`;
    if (order.projectDescription) message += `*Requirements:* "${order.projectDescription}"\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STUDIO_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Send / Forward email to info.almaas.studio@gmail.com
  const handleEmailForOrder = (order: OrderRequest) => {
    const subject = encodeURIComponent(`Project Order Follow-up: ${order.serviceName} - ${order.clientName} [${order.id}]`);
    let body = `Hello Almas Studio Team,\n\n`;
    body += `Following up on my project order for: ${order.serviceName} (ID: ${order.id})\n\n`;
    body += `Client Name: ${order.clientName}\n`;
    body += `Email: ${order.clientEmail}\n`;
    if (order.clientPhone) body += `Phone: ${order.clientPhone}\n`;
    if (order.preferredTimeline) body += `Preferred Timeline: ${order.preferredTimeline}\n`;
    body += `\nProject Requirements:\n${order.projectDescription}\n`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${STUDIO_EMAIL}&su=${subject}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  // Copy order summary text
  const handleCopyOrder = (order: OrderRequest) => {
    let text = `Almas Studio Order [${order.id}]\n`;
    text += `Service: ${order.serviceName}\n`;
    text += `Client: ${order.clientName} (${order.clientEmail})\n`;
    if (order.clientPhone) text += `Phone: ${order.clientPhone}\n`;
    if (order.preferredTimeline) text += `Timeline: ${order.preferredTimeline}\n`;
    text += `\nRequirements:\n${order.projectDescription}\n`;
    
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2500);
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
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-900/[0.1] blur-[120px] pointer-events-none" />

      {/* Title */}
      <section className="mb-10 border-b border-border-app pb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim block mb-2">History</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-medium tracking-tight mb-3 text-text-app">My Orders & Requests</h1>
        <p className="text-text-muted text-xs sm:text-sm max-w-xl font-light leading-relaxed">
          Review your configured orders and communicate directly with our team.
        </p>
      </section>

      <AnimatePresence mode="wait">
        {inquiries.length === 0 ? (
          /* Empty State */
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center py-16 border border-border-app bg-card-bg rounded-sm max-w-lg mx-auto p-8 shadow-sm" 
            id="empty-inquiries"
          >
            <FolderOpen className="w-10 h-10 mx-auto text-text-dim mb-4" />
            <h2 className="text-base font-sans font-medium mb-2 text-text-app">No Orders Found</h2>
            <p className="text-text-muted text-xs font-light max-w-xs mx-auto leading-relaxed mb-6">
              You haven't submitted any service requests yet. Pick a service to place an order.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewChange('estimator')}
              className="px-5 py-2.5 bg-text-app text-bg-app font-mono text-[11px] tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-1.5 font-semibold"
            >
              Request a Project
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        ) : (
          /* Saved List Card list */
          <motion.div 
            key="list"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex flex-col gap-6 max-w-3xl mx-auto" 
            id="inquiries-list"
          >
            <AnimatePresence initial={false}>
              {inquiries.map((order) => (
                <motion.div 
                  key={order.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 }
                  }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, y: -20, marginBottom: 0, padding: 0, transition: { duration: 0.3 } }}
                  className="border border-border-app bg-card-bg p-6 rounded-sm hover:border-border-app-hover transition-all duration-200 shadow-sm relative overflow-hidden"
                  id={`order-card-${order.id}`}
                >
                  {/* Header: ID & Service Type */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-app pb-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-text-dim uppercase">{order.id}</span>
                        <span className="w-1 h-1 rounded-full bg-text-dim" />
                        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{order.serviceName}</span>
                      </div>
                      <h3 className="text-base font-sans font-medium mt-1 text-text-app">Requested by {order.clientName}</h3>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-dim">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>

                  {/* Grid content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                    
                    {/* Selected Modules & Description */}
                    <div className="flex flex-col gap-3">
                      <div>
                        <h4 className="text-[9px] font-mono uppercase tracking-widest text-text-dim mb-1.5 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Requirements / What You Want
                        </h4>
                        <p className="text-text-muted text-xs font-light leading-relaxed bg-bg-app p-3 rounded-sm border border-border-app max-h-32 overflow-y-auto custom-scrollbar">
                          {order.projectDescription}
                        </p>
                      </div>

                      {order.selectedOptions && order.selectedOptions.length > 0 && (
                        <div>
                          <h4 className="text-[9px] font-mono uppercase tracking-widest text-text-dim mb-1">Modules</h4>
                          <div className="flex flex-wrap gap-1">
                            {order.selectedOptions.map((opt, i) => (
                              <span key={i} className="text-[10px] font-mono bg-card-bg border border-border-app text-text-muted px-2 py-0.5 rounded-sm">
                                {opt.optionName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Client info & Timeline */}
                    <div className="flex flex-col gap-3">
                      <div>
                        <h4 className="text-[9px] font-mono uppercase tracking-widest text-text-dim mb-1.5">Contact Details</h4>
                        <div className="flex flex-col gap-1.5 text-xs text-text-muted bg-bg-app border border-border-app p-3 rounded-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-text-dim" />
                            <span className="font-mono">{order.clientEmail}</span>
                          </div>
                          {order.clientPhone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-text-dim" />
                              <span className="font-mono">{order.clientPhone}</span>
                            </div>
                          )}
                          {order.preferredTimeline && (
                            <div className="flex items-center gap-2 mt-1 pt-1 border-t border-border-app/40 text-[11px]">
                              <span className="text-text-dim">Timeline:</span>
                              <span className="text-text-app">{order.preferredTimeline}</span>
                            </div>
                          )}
                          {order.budgetPreference && (
                            <div className="flex items-center gap-2 text-[11px]">
                              <span className="text-text-dim">Scope:</span>
                              <span className="text-text-app">{order.budgetPreference}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-text-dim">
                        <span>Destination: </span>
                        <span className="text-text-app font-medium">{STUDIO_EMAIL}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-border-app pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <span className="text-[10px] font-mono text-text-dim uppercase flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      Status: Dispatched to Studio
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEmailForOrder(order)}
                        className="px-3 py-1.5 bg-card-bg border border-border-app text-xs font-mono tracking-wider uppercase hover:text-text-app hover:border-border-app-hover transition-colors cursor-pointer flex items-center justify-center gap-1 text-text-muted rounded-sm"
                        title="Open in Gmail"
                      >
                        <Mail className="w-3 h-3" />
                        Gmail
                      </button>

                      <button
                        onClick={() => handleWhatsAppForOrder(order)}
                        className="px-3 py-1.5 bg-card-bg border border-border-app text-xs font-mono tracking-wider uppercase hover:text-text-app hover:border-border-app-hover transition-colors cursor-pointer flex items-center justify-center gap-1 text-text-muted rounded-sm"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3 h-3" />
                        WhatsApp
                      </button>

                      <button
                        onClick={() => handleCopyOrder(order)}
                        className="p-1.5 text-text-dim hover:text-text-app transition-colors rounded-sm cursor-pointer border border-border-app"
                        title="Copy Summary"
                      >
                        {copiedId === order.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onDeleteInquiry(order.id)}
                        className="p-1.5 text-text-dim hover:text-red-400 transition-colors rounded-sm cursor-pointer"
                        aria-label="Delete order record"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
