$(function() {
	$('.del').click(function(event) {
		var target = $(event.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)

		$.ajax({
			url: '/admin/list?id=' + id,
			type: 'DELETE',
		})
		.done(function(result) {
			console.log("success");
			if(result.success === 1) {
				if(tr.length > 0) {
					tr.remove()
				}
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		})	
	})
})