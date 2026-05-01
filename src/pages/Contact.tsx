import { Mail, MessageSquare, AlertCircle } from 'lucide-react';

export const Contact = () => {
  return (
    <article className="max-w-[800px] mx-auto pt-32 px-6 pb-40">
      <div className="markdown-body">
        <h3 className="text-[10px] uppercase tracking-widest opacity-30 mb-2 font-bold">Maintenance & Support</h3>
        <h1>Technical Contact Channels</h1>
        
        <p className="mb-16">
          Aura is an actively maintained open-source utility. If you encounter bugs in the 
          Acoustic Fingerprint algorithm or the Wav resynthesis engine, please reach out.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-10 border border-border flex flex-col md:flex-row items-center gap-8 group hover:border-black transition-colors">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-1 mt-0">Technical Support</h3>
              <p className="text-xs opacity-50 mb-0">support@auraremix.internal (Active 24/7 Monitoring)</p>
            </div>
          </div>

          <div className="p-10 border border-border flex flex-col md:flex-row items-center gap-8 group hover:border-black transition-colors">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-1 mt-0">Creator Feedback</h3>
              <p className="text-xs opacity-50 mb-0">Join our community discussions on content autonomy.</p>
            </div>
          </div>

          <div className="p-10 border border-border flex flex-col md:flex-row items-center gap-8 group hover:border-black transition-colors">
            <div className="w-12 h-12 bg-red-50 text-red-900 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-1 mt-0 text-red-900">Incident Response</h3>
              <p className="text-xs opacity-70 mb-0 text-red-900">Report broken fingerprinting bypasses immediately.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 p-8 bg-black text-white rounded-sm">
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Accountability Statement</h3>
          <p className="text-sm font-light">
            We are committed to maintaining this tool as a free, high-uptime resource for the global creator community. 
            All technical issues are triaged by our human engineering team within 12 hours.
          </p>
        </div>
      </div>
    </article>
  );
};
