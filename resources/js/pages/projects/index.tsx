import React from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';

interface Project {
  id: number;
  title: string;
  description?: string;
  project_url?: string;
  image: string;
  status: 'draft' | 'published';
}

const Index = () => {
  // Manually typing the props for projects from Inertia's usePage hook
  const { projects } = usePage<{ projects: Project[] }>().props;

  // Initialize useForm hook for deleting
  const { delete: deleteProject } = useForm();

  // Handle the delete operation
  const handleDelete = (projectId: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(route('projects.destroy', projectId), {
        onSuccess: () => {
          console.log('Project deleted successfully');
        },
        onError: () => {
          console.error('Error deleting the project');
        }
      });
    }
  };

  return (
    <>
    <Head title="Project Index" />
    <div className="container mt-5">
      <h2 className="mb-4">Projects List</h2>
      
      {/* Create Button */}
      <div className="mb-4">
        <a href="/projects/create" className="btn btn-success">
          Create New Project
        </a>
      </div>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
              <td>
                <a href={`/projects/${project.id}`} className="btn btn-info me-1">
                  View
                </a>
                <a href={`/projects/${project.id}/edit`} className="btn btn-warning me-1">
                  Edit
                </a>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Index;
