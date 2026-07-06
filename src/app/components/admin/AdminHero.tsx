import React, { useState, useEffect } from 'react';
import { Save, Loader2, Check } from 'lucide-react';
import { fetchSiteContent, updateHero, type HeroData } from '../../data/firebaseData';

export const AdminHero = () => {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const content = await fetchSiteContent();
    setData(content.hero);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await updateHero(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error('Failed to save hero data:', e);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">Hero Section</h2>
          <p className="text-neutral-500 text-sm font-light mt-1">Edit the main landing area</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-sm font-medium hover:bg-neutral-200 active:scale-[0.97] transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Name */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-sm font-medium mb-5 text-neutral-300">Name</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">First Name</label>
              <input
                value={data.firstName}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Last Name (italic accent)</label>
              <input
                value={data.lastName}
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-sm font-medium mb-5 text-neutral-300">Availability Status</h3>
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Status Text</label>
            <input
              value={data.statusText}
              onChange={(e) => setData({ ...data, statusText: e.target.value })}
              placeholder="Open to Internship Opportunities"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-700"
            />
          </div>
          <p className="text-[10px] text-neutral-600 mt-2 font-mono">This shows as a badge with a green dot on the hero section</p>
        </div>

        {/* Taglines */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h3 className="text-sm font-medium mb-5 text-neutral-300">Taglines</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Left Tagline</label>
              <textarea
                value={data.taglineLeft}
                onChange={(e) => setData({ ...data, taglineLeft: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
              <p className="text-[10px] text-neutral-600 font-mono">Use \n for line breaks</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Right Tagline</label>
              <textarea
                value={data.taglineRight}
                onChange={(e) => setData({ ...data, taglineRight: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
              <p className="text-[10px] text-neutral-600 font-mono">Use \n for line breaks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
