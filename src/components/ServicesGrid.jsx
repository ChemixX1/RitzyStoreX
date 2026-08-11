import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../data/servicesData';
import '../styles/ServiceCard.css';

const categories = ['Todos', 'Streaming', 'Apps', 'IA', 'Gaming', 'Social'];

export default function ServicesGrid() {
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('es');
    return servicesData.filter((service) => {
      const matchesCategory = filter === 'Todos' || service.category === filter;
      const matchesSearch = service.name.toLocaleLowerCase('es').includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchTerm]);

  return (
    <section id="servicios" className="services-section">
      <div className="services-heading">
        <h2>Encuentra tu plataforma favorita</h2>
        <p>Elige una categoría, compara opciones y consulta directamente en segundos.</p>
      </div>

      <div className="catalog-toolbar">
        <label className="search-box" htmlFor="service-search">
          <Search className="search-icon" size={20} aria-hidden="true" />
          <input
            id="service-search"
            type="search"
            placeholder="Buscar Netflix, Canva, ChatGPT..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className="filters-wrapper" aria-label="Filtrar por categoría">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <span className="result-count" aria-live="polite">
          {filteredServices.length} {filteredServices.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => <ServiceCard key={service.id} service={service} />)
        ) : (
          <div className="no-results">
            <Search size={28} />
            <strong>No encontramos “{searchTerm}”</strong>
            <span>Prueba con otro nombre o selecciona “Todos”.</span>
          </div>
        )}
      </div>
    </section>
  );
}
