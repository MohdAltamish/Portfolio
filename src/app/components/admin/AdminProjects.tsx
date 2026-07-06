import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, X, Save, ExternalLink, Github, Loader2 } from 'lucide-react';
import { fetchProjects, addProject, updateProject, deleteProject, type Project } from '../../data/firebaseData';

const emptyProject: Omit<Project, 'id'> = {
  slug: '',
  title: '',
  category: '',
  image: '',
  year: new Date().getFullYear().toString(),
  client: '',
  role: '',
  description: '',
  github: '',
  live: '',
  stack: [],
  order: 0,
};

export const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>(emptyProject);
  const [stackInput, setStackInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData(emptyProject);
    setStackInput('');
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      slug: project.slug,
      title: project.title,
      category: project.category,
      image: project.image,
      year: project.year,
      client: project.client,
      role: project.role,
      description: project.description,
      github: project.github || '',
      live: project.live || '',
      stack: project.stack || [],
      order: project.order || 0,
    });
    setStackInput((project.stack || []).join(', '));
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const stackArray = stackInput.split(',').map(s => s.trim()).filter(Boolean);
    const projectData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      stack: stackArray,
    };

    try {
      if (editingProject?.id) {
        await updateProject(editingProject.id, projectData);
      } else {
        await addProject(projectData);
      }
      setModalOpen(false);
      await loadProjects();
    } catch (e) {
      console.error('Failed to save project:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setDeleteConfirm(null);
      await loadProjects();
    } catch (e) {
      console.error('Failed to delete project:', e);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-medium tracking-tight">Projects</h2>
          <p className="text-neutral-500 text-sm font-light mt-1">{projects.length} projects</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl text-sm font-medium hover:bg-neutral-200 active:scale-[0.97] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-5 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
          >
            {/* Thumbnail */}
            <div className="w-16 h-12 rounded-lg bg-white/5 overflow-hidden shrink-0">
              {project.image && (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium truncate">{project.title}</h3>
              <p className="text-xs text-neutral-500 truncate">{project.category} · {project.year}</p>
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 text-neutral-500 hover:text-white transition-all">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-white/5 text-neutral-500 hover:text-white transition-all">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => openEditModal(project)}
                className="p-2 rounded-lg hover:bg-white/5 text-neutral-500 hover:text-white transition-all"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirm(project.id || null)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-500 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="fixed inset-0 bg-black/60 z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-6"
            >
              <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="text-lg font-medium mb-2">Delete Project?</h3>
                <p className="text-neutral-500 text-sm mb-6">This action cannot be undone. The project will be permanently removed.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-[201] flex items-start justify-center p-6 overflow-y-auto"
            >
              <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 max-w-2xl w-full my-10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-medium">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <button onClick={() => setModalOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-all">
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Title" value={formData.title} onChange={(v) => setFormData({ ...formData, title: v })} required />
                    <InputField label="Slug" value={formData.slug} onChange={(v) => setFormData({ ...formData, slug: v })} placeholder="auto-generated" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Category" value={formData.category} onChange={(v) => setFormData({ ...formData, category: v })} placeholder="e.g. AI/ML · Healthcare" />
                    <InputField label="Year" value={formData.year} onChange={(v) => setFormData({ ...formData, year: v })} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Client / Event" value={formData.client} onChange={(v) => setFormData({ ...formData, client: v })} />
                    <InputField label="Role" value={formData.role} onChange={(v) => setFormData({ ...formData, role: v })} />
                  </div>

                  <InputField label="Image URL" value={formData.image} onChange={(v) => setFormData({ ...formData, image: v })} placeholder="https://..." />

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none placeholder:text-neutral-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="GitHub URL" value={formData.github || ''} onChange={(v) => setFormData({ ...formData, github: v })} placeholder="https://github.com/..." />
                    <InputField label="Live URL" value={formData.live || ''} onChange={(v) => setFormData({ ...formData, live: v })} placeholder="https://..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">Tech Stack (comma-separated)</label>
                    <input
                      value={stackInput}
                      onChange={(e) => setStackInput(e.target.value)}
                      placeholder="React, Firebase, Python"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-700"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving || !formData.title}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-neutral-200 active:scale-[0.97] transition-all disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {saving ? 'Saving...' : 'Save Project'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable input field
const InputField = ({ label, value, onChange, placeholder, required }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">{label}</label>
    <input
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-700"
    />
  </div>
);
