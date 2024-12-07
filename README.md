# Task Manager app

A modern, responsive task management application built with React, TypeScript, and styled-components. Features a drag-and-drop interface for managing tasks across different status columns.

## Features

- 📋 Kanban-style board with To Do, In Progress, and Done columns
- 🎯 Task priority levels (high, medium, low)
- ✨ Drag and drop functionality for easy task status updates
- 💾 Local storage persistence
- 📱 Responsive design for all screen sizes
- 🎨 Clean and modern UI with smooth animations
- ✏️ Create, edit, and delete tasks
- 🔍 View detailed task information in a modal

## Screenshots

### Main Task Board
![Task Board](/public/image1.png)
*Main interface showing the Kanban-style board with task columns*

### Task Creation Layout
![Add Task](/public/image2.png)
*Task creation form with priority selection*

### Task Details Layout
![Task Details](/public/image3.png)
*Detailed task view with editing capabilities*

## Tech Stack

- React 18
- TypeScript
- Vite
- Styled Components
- React Beautiful DND (for drag and drop)
- UUID (for unique IDs)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
task-manager/
├── src/
│   ├── components/
│   │   ├── TaskBoard.tsx
│   │   ├── TaskColumn.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskModal.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── README.md
```

## Usage

1. **Adding a Task**
   - Fill out the task form at the top of the board
   - Enter title, description, and priority
   - Click "Add Task" to create a new task in the "To Do" column

2. **Moving Tasks**
   - Drag and drop tasks between columns to update their status
   - Changes are automatically saved to local storage

3. **Editing Tasks**
   - Click on a task to open the edit modal
   - Update task details and save changes

4. **Deleting Tasks**
   - Click the delete icon on any task card to remove it

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Styling

The project uses styled-components for styling. Each component has its own styled components defined at the top of the file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Beautiful DND for the smooth drag and drop functionality
- Styled Components for the styling solution
- The React and TypeScript communities for excellent documentation and support
