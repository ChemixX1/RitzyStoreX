import { useState } from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../data/servicesData';
import '../styles/ServiceCard.css';

export default function ServicesGrid() {
  const [filter, setFilter] = useState('Todos');
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ['Todos', 'Streaming', 'Apps', 'IA', 'Gaming', 'Social'];
  const filteredServices = servicesData.filter(service => {
    const matchesCategory = filter === 'Todos' || service.category === filter;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="servicios" className="services-section">
      <div className="section-header">
      </div>
      
      <div className="catalog-controls">
        
        <div className="search-wrapper">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar servicio..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="filters-wrapper">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      <div className="services-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service}
              isActive={activeServiceId === service.id}
              onActivate={() => setActiveServiceId(service.id)}
              onDeactivate={() => setActiveServiceId(null)}
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', padding: '2rem' }}>
            <p>No se encontraron resultados para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </section>
  );
}