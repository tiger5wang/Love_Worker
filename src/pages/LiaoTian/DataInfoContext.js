
import React, {Component} from 'react';
import styles from '@/pages/wordsList/index.css';
import { Flex, Icon, Toast } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';


class DataInfoContext extends Component {


  state={
    context:''
  }


  componentDidMount(){
      this.get_context_info()
  }

  get_context_info =() =>{
    const{dispatch, location} = this.props;
    dispatch({
      type:'postContext/postLioaTianContextInfo',
      payload:{
        id: location.query.ID
      },
      callback: response => {
        if(response.code===200){
          this.setState({
            context: response.url
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
            <div>
              <Icon onClick={() => this.ContextRouter()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont} style={{fontSize:20}}>{this.props.location.query.Title}</span>
          </Flex>
        </div>
        <div>
          {context.split(',').map(item => (<img style={{width: 300}} src={item}/>))}
        </div>
      </div>
    );
  }
}

export default connect(({postContext}) => ({
  postContext
}))(DataInfoContext)
