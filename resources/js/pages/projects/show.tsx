import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import Nav from './nav';

// Type definition for the project data
interface Project {
  id: number;
  title: string;
  description?: string;
  project_url?: string;
  image: string;
  status: 'draft' | 'published';
}

const Show = () => {
  // Retrieve the project prop using usePage
  const { project } = usePage<{ project: Project }>().props;

  return (
    <>
    <Head title="Project Show"/>
    <Nav/>
    <div className="container mt-3">
      <h2 className="mb-4">Project Details</h2>

      <div className="card">
        <div className="card-header">
          <h3>{project.title}</h3>
        </div>
        <div className="card-body">
          {project.image && (
            <img
              src={`/storage/${project.image}`}
              alt={project.title}
              className="img-fluid mb-3"
            />
          )}

          <p><strong>Description:</strong> {project.description || 'No description available'}</p>
          <p><strong>Status:</strong> {project.status === 'published' ? 'Published' : 'Draft'}</p>
          {project.project_url && (
            <p>
              <strong>Project URL:</strong>
              <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                {project.project_url}
              </a>
            </p>
          )}
        </div>
        <div className="card-footer">
          <Link href={`/projects/${project.id}/edit`} className="btn btn-warning">
            Edit Project
          </Link>
          <Link href={`/projects`} className="btn btn-info ms-1">
            Back
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Show;
