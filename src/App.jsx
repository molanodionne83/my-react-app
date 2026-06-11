import { useState } from 'react'
import { useClasses } from './ClassContext'

function NavBar() {
  return (
    <nav style={{
      backgroundColor: '#7b2d8b',
      padding: '14px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px'
    }}>
      <h2 style={{ color: 'white', margin: 0 }}>⚛️ Dionne's CPR Manager</h2>
      <p style={{ color: '#f9d4ff', margin: 0, fontSize: '14px' }}>React App</p>
    </nav>
  )
}

function ClassCard({ item, onDelete }) {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #dddddd',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h3 style={{ color: '#7b2d8b', margin: '0 0 6px 0' }}>{item.name}</h3>
        <p style={{ margin: '4px 0', color: '#555', fontSize: '14px' }}>📅 {item.date}</p>
        <p style={{ margin: '4px 0', color: '#555', fontSize: '14px' }}>📍 {item.location}</p>
        <p style={{ margin: '4px 0', color: '#555', fontSize: '14px' }}>👥 {item.spots} spots available</p>
        <span style={{
          backgroundColor: item.type === 'basic' ? '#e6f7ff' : item.type === 'advanced' ? '#f0e6ff' : '#e6fff0',
          color: item.type === 'basic' ? '#185FA5' : item.type === 'advanced' ? '#7b2d8b' : '#0F6E56',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {item.type.toUpperCase()}
        </span>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        style={{
          backgroundColor: '#cc0000',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Delete
      </button>
    </div>
  )
}

function AddClassForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    date: '',
    location: '',
    spots: '',
    type: 'basic'
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.date || !form.location || !form.spots) {
      alert('Please fill in all fields!')
      return
    }
    onAdd({ ...form, id: Date.now(), spots: parseInt(form.spots) })
    setForm({ name: '', date: '', location: '', spots: '', type: 'basic' })
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '15px',
    border: '1px solid #cccccc',
    borderRadius: '6px',
    marginBottom: '12px',
    boxSizing: 'border-box'
  }

  return (
    <div style={{
      backgroundColor: '#f9f0ff',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '30px'
    }}>
      <h2 style={{ color: '#7b2d8b', marginTop: 0 }}>➕ Add New Class</h2>
      <input style={inputStyle} name="name" placeholder="Class name" value={form.name} onChange={handleChange} />
      <input style={inputStyle} name="date" placeholder="Date (e.g. June 10, 2026)" value={form.date} onChange={handleChange} />
      <input style={inputStyle} name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <input style={inputStyle} name="spots" placeholder="Available spots" type="number" value={form.spots} onChange={handleChange} />
      <select style={inputStyle} name="type" value={form.type} onChange={handleChange}>
        <option value="basic">Basic</option>
        <option value="advanced">Advanced</option>
        <option value="online">Online</option>
      </select>
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#7b2d8b',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Add Class
      </button>
    </div>
  )
}

function FilterBar({ active, onFilter }) {
  const filters = ['all', 'basic', 'advanced', 'online']
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onFilter(f)}
          style={{
            backgroundColor: active === f ? '#7b2d8b' : 'white',
            color: active === f ? 'white' : '#7b2d8b',
            border: '2px solid #7b2d8b',
            padding: '8px 18px',
            borderRadius: '20px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}

function App() {
  const { classes, addClass, deleteClass } = useClasses()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? classes
    : classes.filter(c => c.type === filter)

  return (
    <div style={{ backgroundColor: '#e6f7ff', minHeight: '100vh', fontFamily: 'Arial' }}>
      <NavBar />
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px 40px' }}>

        <AddClassForm onAdd={addClass} />

        <h2 style={{ color: '#444' }}>📋 CPR Classes ({filtered.length})</h2>
        <FilterBar active={filter} onFilter={setFilter} />

        {filtered.length === 0 && (
          <p style={{ color: '#888', textAlign: 'center', padding: '40px' }}>
            No classes found for this filter.
          </p>
        )}

        {filtered.map(item => (
          <ClassCard key={item.id} item={item} onDelete={deleteClass} />
        ))}
      </div>
    </div>
  )
}

export default App