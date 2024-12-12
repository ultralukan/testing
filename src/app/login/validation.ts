import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('Неверные формат email').required('Обязательное поле'),
  password: Yup.string().min(8, 'Минимальная длина - 8 символов').required('Обязательное поле'),
});
  