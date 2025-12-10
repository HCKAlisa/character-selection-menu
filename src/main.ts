// Application initialization
const app = document.getElementById('app');

if (app) {
  app.innerHTML = '<h1>Application initialized</h1>';
  console.log('Application initialized');
} else {
  console.error('Failed to find app element');
}