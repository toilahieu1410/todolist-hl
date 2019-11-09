import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button,Icon, List,Menu,Dropdown,Input,Select,Spin,Form,DatePicker,Upload, message, } from 'antd';
import AdminLayout from '../components/AdminLayout'
import SectionContent from '../components/SectionContent'
import SectionHeader from '../components/SectionHeader'
import SectionHeaderTemplate from '../components/SectionHeaderTemplate'
import '../containers/index.css'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import debounce from 'lodash/debounce';


const onChange = e => {
  console.log(e);
};
const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
const { SubMenu } = Menu;

const avatar = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    data: [],
    value: [],
    fetching: false,
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    modal1Visible: false,
    modal2Visible: false,
  }

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  handleOK = () => {
    this.setState({
      confirmLoading:true,
    });

    setTimeout(() => {
      this.setState({
        visible:false,
        confirmLoading: false,
      },1000);
    })
  }

  handleCancel = () => {
    this.setState({
      visible:false,
    })
  }
  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    const menu2 = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">
            TEST 1
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">
            TEST 2
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">
            TEST 31111
          </a>
        </Menu.Item>
      </Menu>
    );
    const menudropdown = [
      { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
    ];
    const pageTitle = 'Công việc của code'
    const { visible, confirmLoading, ModalText,value,fetching,data } = this.state;
    return (
    
      <AdminLayout>
          <SectionHeader>
       
            <SectionHeaderTemplate
              breadcrumbRoutes={[{ path: '/admin', title: 'Home' }, { title: pageTitle }]}
              title={pageTitle}
              
            />
           
          </SectionHeader>
        <SectionContent>
        <div>
        <Icon type="plus" />
        <List.Item type="primary" style={{display:'inline',marginLeft:10}} onClick={() => this.setModal1Visible(true)}>
          Tạo công việc
        </List.Item>
        &nbsp;&nbsp;
        <span>hoặc</span>
        <List.Item type="primary" style={{display:'inline',marginLeft:10}} onClick={() => this.setModal2Visible(true)}>
          Tạo nhóm công việc mới
        </List.Item>
        <div style={{float:'right'}}>
        <Dropdown overlay={menu} >
        <a className="ant-dropdown-link" href="#" style={{marginRight:'10'}}>
        Trạng thái <Icon type="down" />
        </a>
      </Dropdown>
      <Dropdown overlay={menu2} style={{float:'right'}}>
        <a className="ant-dropdown-link" href="#">
          Mới cập nhật <Icon type="down" />
        </a>
      </Dropdown>
        </div>
  
        <Modal
          title="Tạo công việc mới"
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
           <Form.Item>
           <TextArea placeholder="Tên công việc *" allowClear onChange={onChange} rows="2"  />
           </Form.Item>
   
      <Form.Item>
      <CKEditor
        
        editor={ ClassicEditor }
        data="<p>Mô tả chi tiết công việc</p>"
        config={{         
          toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote','alignLeft', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
            'tableColumn', 'tableRow', 'mergeTableCells', 'mediaEmbed',  '|', 'undo', 'redo']
        }}  
      />
      </Form.Item>
     
        <Form.Item className='form-selector'> 
           <Icon type="user" />

        <Select
          Icon="user"
          mode="multiple"
          labelInValue
          value={value}
          placeholder="Select users"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '100%' }}
          
        >
        {data.map(d => (
          <Option key={d.value}>{d.text}</Option>
        ))}
        
        </Select>
            </Form.Item>
  
            <Form.Item className='form-selector'> 
           <Icon type="folder" />
           <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        className="menu-dropdown-sub1"
      >
    <SubMenu className='dropdown-sub'
          key="sub4"
          title={
              <span>Chưa phân loại</span>
          }
        >
          <Menu.Item key="9">Chưa phân loại</Menu.Item>
        </SubMenu>
        </Menu>
    
            </Form.Item>
            
        <Form.Item> 
           <Icon type="schedule" />
           <DatePicker onChange={onChange} />
            </Form.Item>
            <Form.Item>
            <Upload {...avatar}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
            </Form.Item>
          <p>some contents...</p>
        </Modal>

        <Modal
         title="Tạo nhóm công việc mới"
         centered
         visible={this.state.modal2Visible}
         onOk={() => this.setModal2Visible(false)}
         onCancel={() => this.setModal2Visible(false)}
        >
          <Form.Item>
            <h4>TÊN NHÓM CÔNG VIỆC *</h4>
           <TextArea placeholder="Tên nhóm công việc *" allowClear onChange={onChange} rows="2"  />
           </Form.Item>
           <Form.Item>
           <h4>Mô tả thêm</h4>
           <TextArea placeholder="Mô tả thêm về nhóm công việc này" allowClear onChange={onChange} rows="2"  />
           </Form.Item>
        </Modal>
      </div>
        </SectionContent>
      </AdminLayout>
    )
  }
}

export default connect()(Dashboard)
