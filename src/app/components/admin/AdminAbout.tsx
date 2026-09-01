import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Plus, X, Loader2, Check } from 'lucide-react';
import { fetchSiteContent, updateAbout, type AboutData } from '../../data/firebaseData';

export const AdminAbout = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [newCert, setNewCert] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const content = await fetchSiteContent();
    setData(content.about);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await updateAbout(data);
      setSaveError(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error('Failed to save about data:', e);
      setSaveError('Failed to save. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateParagraph = (index: number, value: string) => {
    if (!data) return;
    const newParagraphs = [...data.paragraphs];
    newParagraphs[index] = value;
    setData({ ...data, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    if (!data) return;
    setData({ ...data, paragraphs: [...data.paragraphs, ''] });
  };

  const removeParagraph = (index: number) => {
    if (!data) return;
    setData({ ...data, paragraphs: data.paragraphs.filter((_, i) => i !== index) });
  };

  const updateStat = (index: number, field: string, value: string) => {
    if (!data) return;
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData({ ...data, stats: newStats });
  };

  const addCertification = () => {
    if (!data || !newCert.trim()) return;
    setData({ ...data, certifications: [...data.certifications, newCert.trim()] });
    setNewCert('');
  };

  const removeCertification = (index: number) => {
    if (!data) return;
    setData({ ...data, certifications: data.certifications.filter((_, i) => i !== index) });
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
          <h2 className="text-2xl font-medium tracking-tight">About Section</h2>
          <p className="text-neutral-500 text-sm font-light mt-1">Edit your bio, stats, and certifications</p>
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

      {/* Error banner */}
      {saveError && (
        <div className="mb-4 flex items-center justify-between gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <span>{saveError}</span>
          <button onClick={() => setSaveError(null)} className="text-red-400 hover:text-red-300 transition-colors shrink-0 text-lg leading-none">&times;</button>
        </div>
      )}

      <div className="space-y-10">
        {/* Heading */}
        <Section title="Section Heading">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Heading Text</label>
              <input
                value={data.heading}
                onChange={(e) => setData({ ...data, heading: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Accent Word (italic)</label>
              <input
                value={data.headingAccent}
                onChange={(e) => setData({ ...data, headingAccent: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </Section>

        {/* Paragraphs */}
        <Section title="Bio Paragraphs">
          <div className="space-y-4">
            {data.paragraphs.map((paragraph, i) => (
              <div key={i} className="relative group">
                <textarea
                  value={paragraph}
                  onChange={(e) => updateParagraph(i, e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none pr-10"
                />
                <button
                  onClick={() => removeParagraph(i)}
                  className="absolute top-3 right-3 p-1 rounded-lg hover:bg-red-500/20 text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button onClick={addParagraph} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
              <Plus className="w-4 h-4" /> Add Paragraph
            </button>
          </div>
        </Section>

        {/* Stats */}
        <Section title="Stats">
          <div className="space-y-4">
            {data.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Value</label>
                  <input
                    value={stat.value}
                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Suffix</label>
                  <input
                    value={stat.suffix}
                    onChange={(e) => updateStat(i, 'suffix', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Label</label>
                  <input
                    value={stat.label}
                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <div className="flex flex-wrap gap-2 mb-4">
            {data.certifications.map((cert, i) => (
              <motion.span
                key={cert}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm"
              >
                {cert}
                <button onClick={() => removeCertification(i)} className="text-neutral-600 hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newCert}
              onChange={(e) => setNewCert(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCertification()}
              placeholder="Add certification..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-700"
            />
            <button onClick={addCertification} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm hover:bg-white/10 transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </Section>

        {/* Resume Link */}
        <Section title="Resume Drive Link">
          <input
            value={data.resumeDriveLink}
            onChange={(e) => setData({ ...data, resumeDriveLink: e.target.value })}
            placeholder="https://drive.google.com/..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-700"
          />
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
    <h3 className="text-sm font-medium mb-5 text-neutral-300">{title}</h3>
    {children}
  </div>
);
