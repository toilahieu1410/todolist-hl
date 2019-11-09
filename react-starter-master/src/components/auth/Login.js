import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Layout, Input, Modal, Icon } from 'antd';
import 'antd/dist/antd.css';
import logoImage from '../../assets/react.svg';
import backgroundImage from '../../assets/background.jpg'
import './index.css'
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className="page-login"  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
      <section className="container">
        <div className="form-login" style={{backgroundColor:'#fff',width:450,borderRadius:'4px',padding:'0px 50px', textAlign:'center',margin:'0 auto',boxShadow:'0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'}}>
          <img src={logoImage} style={{height:48,width:48,textAlign:'center',marginTop:10}} alt='Login' />
          <h2 className="large text-primary" style={{fontSize:36}}>ĐĂNG NHẬP</h2>
          <p className="lead"><i className="fas fa-user" /> Tài Khoản Đăng Nhập</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <p className="text-left"  style={{marginBottom:0}}>Email:</p>
          <Input
            type="email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
        <p className="text-left" style={{marginBottom:0}}>Mật khẩu:</p>
          <Input
            type="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength={8}
          />
        </div>
        <input style={{minWidth:150,borderRadius:20}} type="submit" className="btn btn-primary" defaultValue="Login" />
      </form>
      <p className="paddingtop100">
        Chưa có tài khoản? &nbsp; &nbsp; <Link to="/register">Đăng Ký</Link>
      </p>
     </div>
    
    </section>
    </div>
 

  )
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
