import React, { useState, useRef } from 'react';
import { Check, Upload, Link2, Sparkles, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { PRESET_AVATARS, AvatarOption } from '../../data/avatars';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onSelectAvatar: (url: string) => void;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  onSelectAvatar,
  title = 'Choose Your Profile Avatar / DP',
  subtitle = 'Pick a character, upload your own photo, or paste a link',
  compact = false
}) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Student' | 'Coder' | 'Professional' | 'Stylized' | 'Custom'>('All');
  const [customUrl, setCustomUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', 'Coder', 'Student', 'Professional', 'Stylized', 'Custom'] as const;

  const filteredAvatars = activeCategory === 'All' 
    ? PRESET_AVATARS 
    : PRESET_AVATARS.filter(a => a.category === activeCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image is larger than 5MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onSelectAvatar(result);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleCustomUrlApply = () => {
    if (customUrl.trim().startsWith('http://') || customUrl.trim().startsWith('https://') || customUrl.trim().startsWith('data:image')) {
      onSelectAvatar(customUrl.trim());
      setCustomUrl('');
    } else {
      setUploadError('Please enter a valid HTTP or HTTPS image URL.');
    }
  };

  return (
    <div className={`space-y-3 ${compact ? 'p-3 bg-slate-50 rounded-2xl border border-slate-200' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{title}</span>
          </h4>
          {subtitle && (
            <p className="text-[11px] text-slate-500">{subtitle}</p>
          )}
        </div>

        {/* Current Active Preview */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full ring-2 ring-indigo-500 p-0.5 overflow-hidden shadow-sm bg-white">
              <img 
                src={selectedAvatar || PRESET_AVATARS[0].url} 
                alt="Selected DP" 
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback if broken image URL
                  (e.target as HTMLImageElement).src = PRESET_AVATARS[0].url;
                }}
              />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
              <Check className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat === 'Custom' ? 'Upload Photo' : cat}
          </button>
        ))}
      </div>

      {/* Preset Avatars Grid */}
      {activeCategory !== 'Custom' ? (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 max-h-48 overflow-y-auto p-1">
          {filteredAvatars.map((avatar) => {
            const isSelected = selectedAvatar === avatar.url;
            return (
              <button
                key={avatar.id}
                type="button"
                onClick={() => onSelectAvatar(avatar.url)}
                title={avatar.name}
                className={`relative group rounded-2xl p-1 transition transform hover:scale-105 ${
                  isSelected 
                    ? 'ring-2 ring-indigo-600 bg-indigo-50/60 shadow-sm' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <div className="w-11 h-11 mx-auto rounded-full overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {isSelected && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white rounded-full p-0.5 shadow">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
                <span className="block text-[9px] text-center text-slate-600 font-medium truncate mt-1">
                  {avatar.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Custom Photo Upload & URL Entry */
        <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo from Device</span>
            </button>

            <span className="text-[11px] text-slate-400 font-medium">or</span>

            <div className="w-full sm:flex-1 flex items-center gap-1.5">
              <input
                type="url"
                placeholder="Paste image URL (https://...)"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="flex-1 text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleCustomUrlApply}
                disabled={!customUrl.trim()}
                className="px-3 py-1.5 bg-indigo-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition"
              >
                Apply
              </button>
            </div>
          </div>

          {uploadError && (
            <p className="text-[11px] text-rose-600 font-medium">{uploadError}</p>
          )}

          <p className="text-[10px] text-slate-400">
            JPG, PNG, GIF, or WebP. Files are stored locally in your browser so your custom DP persists automatically.
          </p>
        </div>
      )}
    </div>
  );
};
