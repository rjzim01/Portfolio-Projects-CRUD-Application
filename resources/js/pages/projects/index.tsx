import React, { useState, useEffect } from 'react';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Nav from './nav';
import "../../../css/style.css";

interface Project {
  id: number;
  title: string;
  description?: string;
  project_url?: string;
  image: string;
  status: 'draft' | 'published';
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedProjects {
  data: Project[];
  links: PaginationLink[];
}

const Index = () => {

  // Manually typing the props for projects from Inertia's usePage hook
  const { projects, allProjects } = usePage<{ 
    projects: PaginatedProjects; 
    allProjects: Project[]; 
  }>().props;


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProjects([]);
      return;
    }

    const matches = allProjects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProjects(matches);
  }, [searchTerm, allProjects]);


  // Dynamic Project table row
  const ProjectRow = ({ project, onDelete }: { project: Project; onDelete: (id: number) => void }) => (
    <tr>
      <td>{project.title}</td>
      <td>{project.description}</td>
      <td>{project.status}</td>
      <td>
        <Link href={`/projects/${project.id}`} className="btn btn-info me-1">View</Link>
        <Link href={`/projects/${project.id}/edit`} className="btn btn-warning me-1">Edit</Link>
        <button 
          className="btn btn-danger" 
          onClick={() => onDelete(project.id)}
          disabled={processing}
        >
          {processing ? 'Deleting...' : 'Delete'}
        </button>
      </td>
    </tr>
  );

  // Initialize useForm hook for deleting
  const { delete: deleteProject, processing } = useForm();

  // Handle the delete operation
  const handleDelete = (projectId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This project will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(route('projects.destroy', projectId), {
          onSuccess: () => {
            Swal.fire('Deleted!', 'Project has been deleted.', 'success');
          },
          onError: () => {
            Swal.fire('Error!', 'There was a problem deleting the project.', 'error');
          }
        });
      }
    });
  };

  const [sortConfig, setSortConfig] = useState<{ key: keyof Project; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof Project) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const renderSortIcon = (key: keyof Project) => {
    if (!sortConfig || sortConfig.key !== key) return <i className="bi bi-arrow-down-up ms-1"></i>;
    if (sortConfig.direction === 'asc') return <i className="bi bi-arrow-up ms-1"></i>;
    return <i className="bi bi-arrow-down ms-1"></i>;
  };


  
  return (
    <>
    <Head title="Project Index" />
    {/* Navbar */}
    <Nav/>
    {/* Body */}
    <div className="container mt-3">

      <h2 className="mb-4">Projects List</h2>
      
      {/* Create Button */}
      <div className="mb-4 d-flex justify-content-between align-items-center">

        {/* Create Button */}
        <Link href="/projects/create" className="btn btn-success">
          Create New Project
        </Link>

        {/* Search Input with Result */}
        <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
          <input
            type="text"
            placeholder="Search projects..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredProjects.length > 0 && (
            <div
              className="card shadow mt-1"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
            >
              <h6 className="card-header">Search Results</h6>
              <ul className="list-group list-group-flush">
                {filteredProjects.map((project) => (
                  <li key={project.id} className="list-group-item">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-decoration-none text-body project-link"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
      
      <div style={{ whiteSpace: 'nowrap' }}>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                {/* <th>Title</th> */}
                <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Title</span> 
                    {renderSortIcon('title')}
                  </div>
                </th>
                {/* <th>Description</th> */}
                <th onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Description</span> 
                    {renderSortIcon('description')}
                  </div>
                </th>
                {/* <th>Status</th> */}
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Status</span> 
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {projects.data.map((project) => (
                <ProjectRow key={project.id} project={project} onDelete={handleDelete} />
              ))} */}

              {[...projects.data]
                .sort((a, b) => {
                  if (!sortConfig) return 0;

                  // const aVal = a[sortConfig.key] ?? '';
                  // const bVal = b[sortConfig.key] ?? '';

                  const aVal = String(a[sortConfig.key] ?? '').toLowerCase();
                  const bVal = String(b[sortConfig.key] ?? '').toLowerCase();

                  if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                  if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                  return 0;
                })
                .map((project) => (
                  <ProjectRow key={project.id} project={project} onDelete={handleDelete} />
              ))}

            </tbody>
          </table>
          <div className="d-flex justify-content-end mt-4">
            {projects.links.map((link, index) => (
              <Link
                key={index}
                href={link.url ?? '#'}
                className={`btn btn-sm me-1 mb-1 ${link.active ? 'btn-primary' : 'btn-outline-secondary'} ${!link.url ? 'disabled' : ''}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default Index;
