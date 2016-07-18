import React from 'react';
import Star from './Star';
import VendorMarket from './VendorMarket';
import { Link } from 'react-router';


class Vendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vendor: null, editView: false }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: `/api/vendors/${this.props.params.id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( vendor => {
      this.setState({ vendor });
    }).fail( data => {
      console.log(data);
    });
  }

  toggleEdit() {
    this.setState({ editView: !this.state.editView });
  }

  handleEdit(e) {
    e.preventDefault();
    let first_name = this.refs.first_name.value;
    let last_name = this.refs.last_name.value;
    let business_name = this.refs.business_name.value;
    let description = this.refs.description.value;
    let contact_phone = this.refs.contact_phone.value;
    let contact_email = this.refs.contact_email.value;
    let website_link = this.refs.website_link.value;
    let vendor_type = this.refs.vendor_type.value;


    $.ajax({
      url: `/api/vendors/${this.state.vendor.id}`,
      type: 'PUT',
      data: { vendor: { first_name, last_name, business_name, description, contact_phone, contact_email, website_link,vendor_type } },
      dataType: 'JSON'
    }).done( vendor => {
      this.setState({ vendor, editView: false });
    }).fail( data => {
      console.log( data )
    });
  }

  addFavorite() {
    $.ajax({
      url: '/api/favorites',
      type: 'POST',
      data: { id: this.state.vendor.id}
    }).done( data => {
      console.log('saved')
    }).fail( error => {
      console.log(error)
    });
  }

  deleteFavorite() {
    $.ajax({
      url: '/api/favorites',
      type: 'DELETE',
      data: { vendor_id: this.state.vendor.id }
    }).done( data => {
      console.log('deleted')
    }).fail( error => {
      console.log(error)
    });
  }

  editButton() {
    if(this.state.vendor.user_id === parseInt(localStorage.getItem('userId'))) {
      return (
        <div>
          <button className='btn' onClick={this.toggleEdit}>Edit</button>
          <button className='btn red'>Delete</button>
        </div>
      );
    }
  }

  render() {
    if(this.state.editView) {
      return(
        <div>
          <h3>Edit Vendor: {this.state.vendor.name}</h3>
          <form onSubmit={this.handleEdit.bind(this)} >
            <input ref='first_name' className='white-text' type='text' placeholder='First Name' defaultValue={this.state.vendor.first_name} />
            <input ref='last_name' className='white-text' type='text' placeholder='Last Name' defaultValue={this.state.vendor.last_name} />
            <input ref='business_name' className='white-text' type='text' placeholder='Business Name' defaultValue={this.state.vendor.business_name} />
            <input ref='description' className='white-text' type='text' placeholder='Description' defaultValue={this.state.vendor.description} />
            <input ref='contact_phone' className='white-text' type='text' placeholder='Phone' defaultValue={this.state.vendor.contact_phone} />
            <input ref='contact_email' className='white-text' type='text' placeholder='Email' defaultValue={this.state.vendor.contact_email} />
            <input ref='website_link' className='white-text' type='text' placeholder='Website Link' defaultValue={this.state.vendor.website_link} />
            <input ref='vendor_type' className='white-text' type='text' placeholder='Vendor Type' defaultValue={this.state.vendor.vendor_type} />
            <input type='Submit' defaultValue='Update Vendor' className='btn' />
            <button type='button' onClick={this.toggleEdit} className='btn grey'>Cancel</button>
          </form>
        </div>
      );
    } else {
      if(this.state.vendor) {
        return(
          <div>
            <span className='vendor-image'>
            <p className='vendor-text'>{this.state.vendor.business_name}</p>
            </span>
          </div>
          //<div className="col s12 m6">
          //   <div className="card blue-grey darken-1">
          //     <div className="card-content white-text">
          //       <span className="card-title">{this.state.vendor.business_name}</span>
          //
          //       <div>
          //         <label>Description:</label>
          //         <p>{this.state.vendor.description} </p>
          //
          //         <label>Owner name:</label>
          //         <p>{this.state.vendor.first_name} </p>
          //
          //         <label>Contact Phone:</label>
          //         <p>{this.state.vendor.contact_phone}</p>
          //
          //         <label>Contact Email</label>
          //         <p>{this.state.vendor.contact_email}</p>
          //
          //         <label>Website Link</label>
          //         <p>{this.state.vendor.website_link}</p>
          //
          //         <label>Vendor Type</label>
          //         <p>{this.state.vendor.vendor_type}</p>
          //       </div>
          //
          //       <VendorMarket vendor={this.state.vendor} />
          //
          //     </div>
          //     <div className="card-action">
          //       { this.editButton() }
          //       <Link to='/vendors'>All Vendors</Link>
          //       <Star vendorId={this.state.vendor.id} addFavorite={ this.addFavorite.bind(this) } deleteFavorite={this.deleteFavorite.bind(this)} />
          //     </div>
          //   </div>
          // </div>*/}
        );
      } else {
        return(
          <div className='row'>
            <h3 className='center'>Vendor Not Loaded...</h3>
          </div>
        )
      }
    }
  }
}


export default Vendor;
