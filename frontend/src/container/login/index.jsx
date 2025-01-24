import { useState } from 'react'
import { IconInput, Textinput } from '../../components/forms/input';
import Button from '../../components/primary-button';
import useLogin from './useHook';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const { Login } = useLogin();

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const submit = () => {
    Login(formData)
  }

  return (
    <div 
      className="w-full h-screen bg-cover flex justify-center items-center" 
    >
      <div className="w-[57.8rem] h-[57.8rem] bg-shadow-black rounded-[30px] flex justify-center items-center flex-col gap-8">
        <div className="w-[70%]">
          <h1 className="text-white text-2xl">Login to your Account</h1>
          <p className="text-white text-sm">Welcome back! please enter your detail</p>
          <form className="flex flex-col gap-8 pt-8">
            <Textinput
              placeholder="Email"
              onchange={(value) => handleChange('emailOrUsername', value)}
              stateValue={formData.emailOrUsername}
            />
            <IconInput
              placeholder="Password"
              onchange={(value) => handleChange('password', value)}
              stateValue={formData.password}
            />
            <div className="pt-12">
              <Button title="Login" round="full" width="100%" fill={true} onclick={submit}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;