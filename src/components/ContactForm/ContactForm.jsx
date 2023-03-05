import { Form, Label, Input, Button, Messege } from './ContactForm.styled';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import 'yup-phone';

const namePattern =
/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberPattern =/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      namePattern,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Required'),
  number: Yup.string()
  .phone(numberPattern, true, "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +")
  .required('Required'),
})

const ContactForm = ({ setContact, contacts }) => {

  const { register, handleSubmit,  formState:{ errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const checkContscts = (arr, obj) => {
    return arr.every(e => e.name.toLowerCase() !== obj.name.toLowerCase());
  };

  const onSubmit = data => {
    const {name} = data;

    if (checkContscts(contacts, data)) {
          setContact(data);
          reset()
        } else {
          alert(`${name} is already in contacts`);
        }
  };

  return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Name
            <Input
              defaultValue=""
              {...register("name")} 
            />
            <Messege>{errors.name?.message}</Messege>
          </Label>
          <Label>
            Number
            <Input
              defaultValue=""
              {...register("number")} 
            />
            <Messege>{errors.number?.message}</Messege>
          </Label>
          <Button type="submit">Add contact</Button>
        </Form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  setContact: PropTypes.func.isRequired,
};

export default ContactForm;
