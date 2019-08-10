/*
__author__ = 'YongCong Wu'
@Time    : 2019/8/10 11:45
@Email   :  : 1922878025@qq.com
*/
import React, {Component} from 'react';
import styles from '@/pages/wordsList/index.css';
import { Flex, Icon, Toast } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';


class contextInfo extends Component {


  state={
    context:''
  }


  componentDidMount(){
      this.get_context_info()
  }

  get_context_info =() =>{
    const{dispatch, location} = this.props;
    console.log(JSON.stringify(this.props))
    dispatch({
      type:'postContext/postContextInfo',
      payload:{
        id: location.query.ID
      },
      callback: response => {
        if(response.code===200){
          this.setState({
            context: response.context
          })
        }else{
          Toast.offline(response.message);
        }
      }
    })
  };


  ContextRouter = () => {
    router.push({
      pathname: '/',
    });
  };

  render() {

    const{context} = this.state;


    return (
      <div>
        <div className={styles.header}>

          <Flex justify="start">
            <div >
              <Icon onClick={() => this.ContextRouter()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont} style={{fontSize:20}}>{this.props.location.query.Title}</span>
          </Flex>
        </div>
        <div style={{marginTop:50}}>
           <p style={{fontSize: 15, lineHeight: 2, marginTop: 15}}>{context}</p>
        </div>
      </div>
    );
  }
}

export default connect(({postContext}) => ({
  postContext
}))(contextInfo)
