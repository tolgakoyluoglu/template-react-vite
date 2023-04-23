import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuItems = [
    { name: 'Home', path: '/', icon: 'dashboard' },
    { name: 'Workouts', path: '/settings', icon: 'sports_gymnastics' },
    { name: 'Exercises', path: '/settings', icon: 'fitness_center' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ]

  return (
    <div className={`${styles.sidebar} ${isOpen && styles.sidebarOpen} bg-1`}>
      <div>
        <ul className={styles.items}>
          <li className={styles.item}>
            <span onClick={() => setIsOpen(!isOpen)} className="material-icons">
              menu
            </span>
            <h3 className={isOpen ? styles.showText : ''}>App</h3>
          </li>
        </ul>
        <ul className={styles.items}>
          {menuItems.map((item) => {
            return (
              <li key={item.path}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active ${styles.item}` : styles.item
                  }
                  end
                  to={item.path}
                >
                  <span className="material-icons">{item.icon}</span>
                  <h3 className={isOpen ? styles.showText : ''}>{item.name}</h3>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
