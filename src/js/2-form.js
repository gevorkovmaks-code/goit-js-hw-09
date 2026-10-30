const STORAGE_KEY = 'feedback-form-state';

// Змінили назву з formState на formData
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email?.trim() || '';
    formData.message = parsedData.message?.trim() || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing stored form data:', error);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const currentEmail = form.elements.email.value.trim();
  const currentMessage = form.elements.message.value.trim();

  if (!currentEmail || !currentMessage) {
    alert('Fill please all fields');
    return;
  }

  formData.email = currentEmail;
  formData.message = currentMessage;

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});