import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Plus, X, Loader2, Check, Trash2 } from 'lucide-react';
import { fetchSiteContent, updateSkills, type SkillCard } from '../../data/firebaseData';

const ICON_OPTIONS = [
  { value: 'Code2', label: 'Code' },
  { value: 'Layers', label: 'Layers' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Brain', label: 'Brain' },
  { value: 'Database', label: 'Database' },
  { value: 'GitBranch', label: 'Git Branch' },
  { value: 'Cpu', label: 'CPU' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Shield', label: 'Shield' },
  { value: 'Zap', label: 'Zap' },
];

export const AdminSkills = () => {
  const [skills, setSkills] = useState<SkillCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const content = await fetchSiteContent();
    setSkills(content.skills);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSkills(skills);
      setSaveError(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error('Failed to save skills:', e);
      setSaveError('Failed to save. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      { icon: 'Code2', title: '', description: '', skills: [] },
    ]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  if (loading) {
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
          <h2 className="text-2xl font-medium tracking-tight">Technical Skills</h2>
          <p className="text-neutral-500 text-sm font-light mt-1">{skills.length} skill cards</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-4 py-2.5 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-sm font-medium hover:bg-neutral-200 active:scale-[0.97] transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {saveError && (
        <div className="mb-4 flex items-center justify-between gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <span>{saveError}</span>
          <button onClick={() => setSaveError(null)} className="text-red-400 hover:text-red-300 transition-colors shrink-0 text-lg leading-none">&times;</button>
        </div>
      )}

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-mono text-neutral-600">Card {index + 1}</span>
              <button
                onClick={() => removeSkill(index)}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-neutral-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Icon</label>
                <select
                  value={skill.icon}
                  onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                >
                  {ICON_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-neutral-900">{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Title</label>
                <input
                  value={skill.title}
                  onChange={(e) => updateSkill(index, 'title', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Description (Technologies)</label>
              <input
                value={skill.description}
                onChange={(e) => updateSkill(index, 'description', e.target.value)}
                placeholder="Python · Java · C · JavaScript"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-700"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
