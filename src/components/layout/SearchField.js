import TextField from '@material-ui/core/TextField';
import React , {Component }from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

 class SearchField extends Component {
    
    constructor(props){
        super(props);
        this.users = [];
        this.state = {
            suggestions: [],
            text:''
        };
        
        // console.log(this.users);
    }
    
    //แก้ show ค้นหาเพื่อน
    //เพิ่มปุ่มadd เพิื่อนใน หน้าโปรไฟล์เพื่อน
    //ใ้หเจอแต่โพสที่เพื่อนเราโพส
    onTextChanged = (e) => {
        const {users} = this.props.data;
        const userHandles = users.map(data => data.handle);
        // console.log(userHandles);
        // this.setState({users : this.props.data});
        // console.log(users);
        const value = e.target.value;
        let suggestions = [];
        if(value.length >0){
            const regex = new RegExp(`^${value}`,'i');
            // console.log(userHandles);
            suggestions = userHandles.sort().filter( v=> regex.test(v));
            // console.log(suggestions);
        }
        this.setState( ()=>({suggestions,text:value}));
        // console.log(this.state.suggestions);
    }
 
   

    suggestionSelected = value  => {
        //link hre
        // <Link to={`/users/${value}`}></Link>
        console.log("use ss");
        console.log(value);
        this.setState({text:value,suggestions:[]});
    };

    renderSuggestions(){
        const {suggestions} = this.state;
        if(suggestions.length===0){
            return null;
        }
        return(
            <ul>
            {suggestions.map((user)=> <li key = {user} onClick = {()=>this.suggestionSelected(user)}>
            <Link to={`/users/${user}`} activeClassName="active">{user}</Link>

             </li>)}
            </ul>
        )
    }

   

    


    render() {
        return (
            <div>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined"   onChange= {this.onTextChanged}/>
                    {this.renderSuggestions()};
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    data: state.data
  });

export default connect(
    mapStateToProps,
  )(SearchField);
  