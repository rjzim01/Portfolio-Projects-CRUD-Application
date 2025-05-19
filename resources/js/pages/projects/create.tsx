import React, { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        description?: string;
        project_url?: string;
        image: File | null;
        status: 'draft' | 'published';
    }>({
        title: '',
        description: '',
        project_url: '',
        image: null,
        status: 'draft',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <>
        <Head title="Project Create" />
        <div className="container mt-5">
            <h2 className="mb-4">Create New Project</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title *</label>
                    <input
                        type="text"
                        id="title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        rows={4}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                {/* Project URL */}
                <div className="mb-3">
                    <label htmlFor="project_url" className="form-label">Project URL</label>
                    <input
                        type="url"
                        id="project_url"
                        className={`form-control ${errors.project_url ? 'is-invalid' : ''}`}
                        value={data.project_url}
                        onChange={e => setData('project_url', e.target.value)}
                    />
                    {errors.project_url && <div className="invalid-feedback">{errors.project_url}</div>}
                </div>

                {/* Image */}
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Project Image *</label>
                    <input
                        type="file"
                        id="image"
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                        onChange={e => setData('image', e.target.files?.[0] || null)}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                </div>

                {/* Status */}
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status *</label>
                    <select
                        id="status"
                        className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                        value={data.status}
                        onChange={e => setData('status', e.target.value as 'draft' | 'published')}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={processing}>
                    {processing ? 'Submitting...' : 'Create Project'}
                </button>
            </form>
        </div>
        </>
    );
};

export default Create;
