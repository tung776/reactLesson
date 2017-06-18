import React from 'react';
import {connect } from "react-redux";
import {bindActionCreators} from 'redux'
// import {Panel} from 'react-bootstrap';
import {DeleteBook, PostBook, UpdateBook} from '../../actions/bookActions';
import {findDOMNode} from 'react-dom';

class BookForm extends React.Component {
    constructor(props){
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.autoGenId = this.autoGenId.bind(this);
        this.resetDefaultValue = this.resetDefaultValue.bind(this);
        // this.state = {
        //     _id: 0,
        //     title: "",
        //     description: "",
        //     price: 0
        // }
    };
    onSubmitForm(e){
        e.preventDefault();

        let newId = this.autoGenId();
        const book = [{
            _id: newId,
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.PostBook(book);
        this.resetDefaultValue();

        // this.state = {
        //      _id: 0,
        //     title: "",
        //     description: "",
        //     price: 0
        // }
        // this.setState(this.state);
    }
    resetDefaultValue(){
        console.log(findDOMNode(this.refs.description));
        findDOMNode(this.refs.description).value = "";
        findDOMNode(this.refs.title).value = "";
        findDOMNode(this.refs.price).value = "";
    }
    autoGenId(){
        let maxId = 0;
        this.props.books.forEach((item)=>{
            if(item._id > maxId) maxId = item._id;
        });
        maxId ++;
        return maxId;        
    }
    render(){
        return(
            <div className = "well">
                <div className="panel panel-default">
                    <form onSubmit = {this.onSubmitForm} action="">
                        <div className="group-control">
                            <label>Tiêu Đề</label>
                            <input className = "form-control" type="text" placeholder = "Điền tiêu đề sách"
                               ref = "title"
                            />                        
                        </div>
                        <div className="group-control">
                            <label>Mô Tả</label>
                            <input className = "form-control" type="text" placeholder = "Điền mô tả cuốn sách"
                               ref = "description"
                            />                        
                        </div>
                        <div className="group-control">
                            <label>Giá bán</label>
                            <input className = "form-control" type="text" placeholder = "Điền giá bán"
                               ref = "price"
                            />                        
                        </div>
                        <br/>
                        <button className="btn btn-lg btn-primary">Lưu Thông Tin</button>
                    </form>
                </div>                    
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books: state.books
    }
};
function mapActionToProps(dispatch){
    return bindActionCreators({
        PostBook,
        UpdateBook,
        DeleteBook
    }, dispatch);
};

export default connect(mapStateToProps, mapActionToProps)(BookForm);
