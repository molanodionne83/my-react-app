import { createContext, useContext, useReducer } from 'react'

const ClassContext = createContext()

const initialClasses = [
  { id: 1, name: 'Basic CPR & AED', date: 'June 3, 2026', location: 'Manila Training Center', spots: 8, type: 'basic' },
  { id: 2, name: 'Advanced Life Support', date: 'June 7, 2026', location: 'Davao Training Center', spots: 5, type: 'advanced' },
  { id: 3, name: 'Online CPR Certification', date: 'June 10, 2026', location: 'Zoom', spots: 50, type: 'online' },
]

function classReducer(state, action) {
  switch (action.type) {
    case 'ADD_CLASS':
      return [...state, action.payload]
    case 'DELETE_CLASS':
      return state.filter(c => c.id !== action.payload)
    default:
      return state
  }
}

export function ClassProvider({ children }) {
  const [classes, dispatch] = useReducer(classReducer, initialClasses)

  const addClass = (newClass) => {
    dispatch({ type: 'ADD_CLASS', payload: newClass })
  }

  const deleteClass = (id) => {
    dispatch({ type: 'DELETE_CLASS', payload: id })
  }

  return (
    <ClassContext.Provider value={{ classes, addClass, deleteClass }}>
      {children}
    </ClassContext.Provider>
  )
}

export function useClasses() {
  return useContext(ClassContext)
}