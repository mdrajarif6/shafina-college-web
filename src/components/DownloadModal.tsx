import React, { useEffect, useState } from 'react';
import { X, Download, ShieldCheck, Loader2 } from 'lucide-react';
import apkVersion from '../../apk-version.json';

interface Release {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: {
    browser_download_url: string;
    size: number;
    name: string;
  }[];
}

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "EN" | "BN" | "AR";
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, lang }) => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchReleases = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.github.com/repos/mdrajarif6/shafina-college-web/releases');
        let data = [];
        if (response.ok) {
            data = await response.json();
        }

        // Add our locally hosted latest APK to the top
        const localRelease = {
          id: 999999,
          tag_name: `v${apkVersion.versionName}`,
          name: `HJSWC College App v${apkVersion.versionName}`,
          body: "Latest version including all recent feature updates.",
          published_at: new Date().toISOString(),
          assets: [{
            browser_download_url: `/${apkVersion.filename}`,
            size: 15500000,
            name: apkVersion.filename
          }]
        };

        setReleases([localRelease, ...data]);
        setError(null);
      } catch (err) {
        setError(lang === "EN" ? "Failed to load versions. Please try again." : "ভার্সন লোড করতে ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, [isOpen, lang]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Download className="w-6 h-6 text-emerald-400" />
              {lang === "EN" ? "Download Android App" : "অ্যান্ড্রয়েড অ্যাপ ডাউনলোড করুন"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {lang === "EN" ? "Choose a version to install on your device" : "আপনার ডিভাইসে ইনস্টল করার জন্য একটি ভার্সন নির্বাচন করুন"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950/30">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
              <p>{lang === "EN" ? "Loading available versions..." : "উপলব্ধ ভার্সন লোড হচ্ছে..."}</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-rose-400 mb-4">{error}</p>
              <button 
                onClick={() => setReleases([])} 
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                {lang === "EN" ? "Retry" : "পুনরায় চেষ্টা করুন"}
              </button>
            </div>
          ) : releases.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>{lang === "EN" ? "No versions available right now." : "বর্তমানে কোনো ভার্সন উপলব্ধ নেই।"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {releases.map((release, index) => {
                const apkAsset = release.assets.find(a => a.name.endsWith('.apk'));
                const isLatest = index === 0;

                return (
                  <div 
                    key={release.id} 
                    className={`bg-slate-800/50 border ${isLatest ? 'border-emerald-500/30' : 'border-slate-700'} rounded-xl p-5 hover:bg-slate-800 transition-colors`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white">{release.name || release.tag_name}</h3>
                          {isLatest && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                              {lang === "EN" ? "Latest" : "সর্বশেষ"}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
                          {new Date(release.published_at).toLocaleDateString(lang === "EN" ? 'en-US' : 'bn-BD', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                          {apkAsset && <span className="ml-2 text-slate-500">• {(apkAsset.size / (1024 * 1024)).toFixed(1)} MB</span>}
                        </p>
                        {release.body && (
                          <div className="mt-3 text-slate-300 text-sm whitespace-pre-wrap">
                            {release.body}
                          </div>
                        )}
                      </div>

                      {apkAsset ? (
                        <a 
                          href={apkAsset.browser_download_url}
                          download={apkAsset.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                            isLatest 
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                              : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                          }`}
                        >
                          <Download className="w-4 h-4" />
                          {lang === "EN" ? "Download APK" : "এপিকে ডাউনলোড"}
                        </a>
                      ) : (
                        <span className="text-slate-500 text-sm italic">
                          {lang === "EN" ? "No APK available" : "কোনো এপিকে নেই"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
