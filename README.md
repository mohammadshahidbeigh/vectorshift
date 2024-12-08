# Pipeline Builder

A visual pipeline builder for creating and validating data processing workflows.

## Usage

1. **Creating Nodes**

   - Drag nodes from the toolbar
   - Configure node settings
   - Connect nodes using handles

2. **Pipeline Validation**

   - Click Submit to validate
   - Check for DAG compliance
   - Review node connections

3. **Theme Customization**
   - Toggle between light/dark themes
   - Custom node styling per type

## Architecture Decisions

1. **Node Abstraction**

   - BaseNode provides common functionality
   - Specialized nodes extend base functionality
   - Consistent interface across node types

2. **State Management**

   - Centralized state with Zustand
   - Immutable updates for reliability
   - Clear action patterns

3. **Error Handling**

   - Graceful frontend error display
   - Detailed backend error messages
   - User-friendly notifications

4. **UI/UX**
   - Interactive tutorial for new users
   - Consistent design language
   - Responsive layout

### Frontend (React)

The frontend is built with React and uses several key libraries:

- **React Flow**: For the interactive node-based interface
- **Zustand**: For state management
- **Framer Motion**: For animations
- **React Toastify**: For notifications

#### Key Components

1. **Nodes**

   - BaseNode: Abstract component providing common node functionality
   - Specialized Nodes:
     - InputNode: Handles data input
     - OutputNode: Handles data output
     - TextNode: Text processing with variable support
     - LLMNode: Language model integration
     - TransformNode: Data transformation
     - MergeNode: Combines multiple inputs
     - FilterNode: Filters data based on conditions
     - ValidationNode: Validates data against rules
     - TemplateNode: Template-based text processing

2. **State Management**

   - Uses Zustand for centralized state
   - Handles node creation, deletion, and updates
   - Manages connections between nodes
   - Tracks pipeline validation state

3. **UI Components**
   - Tutorial: Interactive onboarding
   - ThemeToggle: Light/dark theme switching
   - PipelineToolbar: Node creation tools
   - PipelineUI: Main workspace

### Backend (FastAPI)

The backend provides pipeline validation and processing:

- DAG validation
- Node count verification
- Edge validation
- Error handling

## Setup

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Backend Tests

```bash
cd backend tests
pytest
```
