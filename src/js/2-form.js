const STORAGE_KEY = 'feedback-form-state';

// 1. Оголошення стану
const formState = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// 3. Перевірка та відновлення даних при завантаженні
const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formState.email = parsedData.email?.trim() || '';
    formState.message = parsedData.message?.trim() || '';

    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
  } catch (error) {
    console.error('Error parsing stored form data:', error);
  }
}

// 2. Відстеження змін у формі (Event Delegation)
form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name in formState) {
    formState[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
  }
});

// 4. Обробка сабміту
form.addEventListener('submit', event => {
  event.preventDefault();

  const currentEmail = form.elements.email.value.trim();
  const currentMessage = form.elements.message.value.trim();

  if (!currentEmail || !currentMessage) {
    alert('Fill please all fields');
    return;
  }

  // Записуємо актуальні значення перед виводом
  formState.email = currentEmail;
  formState.message = currentMessage;

  console.log(formState);

  // Очищення сховища, об'єкта та полів форми
  localStorage.removeItem(STORAGE_KEY);
  formState.email = '';
  formState.message = '';
  form.reset();
});