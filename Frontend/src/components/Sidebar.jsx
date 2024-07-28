import React from 'react'
import 
{ BsCalendarEvent, BsFillPeopleFill, BsFillPlusCircleFill, BsFillGearFill, BsBoxArrowRight }
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCalendarEvent className='icon_header'/> EVENTS
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="#dashboard">
                    <BsCalendarEvent className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#events">
                    <BsCalendarEvent className='icon'/> Events
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#add-event">
                    <BsFillPlusCircleFill className='icon'/> Add Event
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#users">
                    <BsFillPeopleFill className='icon'/> Users
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#settings">
                    <BsFillGearFill className='icon'/> Settings
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="#logout" onClick={() => alert('Logged out')}>
                    <BsBoxArrowRight className='icon'/> Logout
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
