import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import logoImage from '../../assets/redux.png';
import backgroundImage from '../../assets/background.jpg';
import { Input, Icon } from 'antd';
import './index.css'
const Register = ({ setAlert, register,  }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password2 !== password) {
      setAlert('Passwords not match', 'danger');
    } else {
      // const newUser = {
      //   name,
      //   email,
      //   password
      // }

      // try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   }

      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post('/api/users', body, config);
      //   console.log(res.data);

      // } catch (err) {
      //   console.log(err.response.data);
      // }
      register({ name, email, password });
    }
  }

  
  return (
    <Fragment>
      <div className="page-register" style={{  backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',}}>
        <section className="container">
            <div className="form-register" style={{backgroundColor:'#fff',width:900,borderRadius:'4px',padding:'0px 50px', textAlign:'center',margin:'0 auto',boxShadow:'0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'}}>
            <img src={logoImage} style={{height:48,width:48,textAlign:'center',marginTop:10}} alt='Register' />
            <h1 className="large text-primary" style={{fontSize:36}}>ĐĂNG KÝ</h1>
        <p className="lead"><Icon type="user" /> Tạo Tài Khoản</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
          <p className="text-left"  style={{marginBottom:0}}>Tên:</p>
            <Input
              type="text"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
          <p className="text-left"  style={{marginBottom:0}}>Email:</p>
            <Input
              type="email"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
          <p className="text-left"  style={{marginBottom:0}}>Password:</p>
            <Input
              type="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
          <p className="text-left"  style={{marginBottom:0}}>Confirm Password:</p>
            <Input
              type="password"
              prefix={<Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" defaultValue="Register" />
        </form>
        <p className="paddingtop100">
          Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
        </p>
            </div>
        </section>
     
      </div>
    </Fragment>
  )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { setAlert, register })(Register);
