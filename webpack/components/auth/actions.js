export const loggedIn = (id, apiKey) => {
	return {
		type: 'LOGIN',
		id,
		apiKey
	}
}

export const logout = () => {
	return {
		type: 'LOGOUT',
	}
}

export const handleLogin = (email, password, redirect, history) => {
  return(dispatch => {
		$.ajax({
			url:'/users/sign_in',
			type: 'POST',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
			data: { user: {email, password }},
			dataType: 'JSON'
		}).done( response => {
			// set localStorage apiKey
			localStorage.setItem('apiKey', response.api_key);
			// set localStorage userId
			localStorage.setItem('userId', response.id);
			// dispatch the action
			dispatch(loggedIn(response.id, response.api_key));
			// redirect
			history.push('/')
		}).fail( response => {
			// TODO: handle this better
			dispatch(logout());
			console.log(response);
		});
	})
}

export const handleFacebookLogin = (auth, history) => {
  return(dispatch) => {
    $.ajax({
      url: '/facebook_login',
      type: 'POST',
      data: { auth },
      dataType: 'JSON'
    }).done( response => {
      localStorage.setItem('apiKey', response.api_key);
      localStorage.setItem('userId', response.id);
      dispatch(loggedIn(response.id, response.api_key));
      history.push('/');
    }).fail( response => {
      // TODO: Handle this better
      console.log(response);
    })
  }
}

export const handleSignUpShopper = (email, password, password_confirmation, role, history) => {
  return(dispatch => {
		$.ajax({
			url:'/users',
			type: 'POST',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
			data: { user: {email, password, password_confirmation, role }},
			dataType: 'JSON'
		}).done( response => {
			// set localStorage apiKey
			localStorage.setItem('apiKey', response.api_key);
			// set localStorage userId
			localStorage.setItem('userId', response.id);
			// dispatch the action
			dispatch(loggedIn(response.id, response.api_key));
			// redirect
      history.push('/')
		}).fail( response => {
			// TODO: handle this better
			dispatch(logout());
			console.log(response);
		});
	})
}

export const handleSignUpVendor = (email,
																	  password,
																		password_confirmation,
																		role,
																		first_name,
																		last_name,
																		description,
																		business_name,
																		contact_email,
																		contact_phone,
																		website_link,
																		vendor_type,
																	  history ) => {
  return(dispatch => {
		$.ajax({
			url:'/users',
			type: 'POST',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
			data: { user: {email,
										 password,
										 password_confirmation,
										 role
			 }},
			dataType: 'JSON'
		}).done( response => {
			let id = response.id;
			let api_key = response.api_key;
			// set localStorage apiKey
			localStorage.setItem('apiKey', api_key);
			// set localStorage userId
			localStorage.setItem('userId', id);
			// dispatch the action
			dispatch(loggedIn(id, api_key));
			// redirect
         //ajax call to create vendor here
				 $.ajax({
					 url: '/api/vendors',
					 type: 'POST',
					 data: {vendor: {first_name,
													 last_name,
													 description,
													 business_name,
													 contact_email,
													 contact_phone,
													 website_link,
													 vendor_type,
												 	 user_id: id}},
					 dataType: 'JSON'
				 }).done( data => {history.push(`/vendors/${data.id}`)})
		}).fail( data => {
			dispatch(logout());
		});

	})
}

export const handleLogout = (history) => {
	return(dispatch) => {
		$.ajax({
			url: '/users/sign_out',
			type: 'DELETE',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content'))},
			dataType: 'JSON'
		}).done( response => {
			localStorage.removeItem('userId');
			localStorage.removeItem('apiKey');
			dispatch(logout());
			history.push('/');
		}).fail( response => {
			// TODO: handle this better
			dispatch(logout());
			console.log(response);
		})
	}
}
