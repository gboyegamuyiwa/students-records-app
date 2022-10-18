$(document).ready(function() {
            $('#checkAll').on('click', function(){
            if(this.checked){
            $('.checkItem').each(function(){
                this.checked = true;
            });
           } else{
            $('.checkItem').each(function(){
                this.checked = false;
            });
            }
            });
            $('.checkItem').on('click', function(){
            if($('.checkItem:checked').length == $('.checkItem').length){
                $('#checkAll').prop('checked', true);
           } else{
            $('#checkAll').prop('checked', false);
           }
            });
            });

