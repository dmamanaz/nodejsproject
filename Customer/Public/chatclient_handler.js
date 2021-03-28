const socket = io()
$(function() {
    //Code to handle the nickame
    //Also send message
    let isNickSet = false
            socket.on('chat',(data)=>{
                $('textarea').val( $('textarea').val()+data+'\n')
            })

            socket.on('userlist',(data)=>{
                $('#activeuser').empty()
                data.map((item)=>{
                    $('#activeuser').append(`nickname: <strong>${item}</strong><br/>`)
                })
                let total = data.length;
                document.getElementById('listuser').innerHTML = total
                $('b').val(total)
            })
            $(function(){
                $('#nick').on('click',function(event){
                    event.preventDefault()
                    socket.emit('nick',$('#nickText').val())
                    $('#nick').hide()
                    isNickSet = true
                })

                $('#chat').on('click',(event)=>{
                    event.preventDefault()
                    if(isNickSet){
                        socket.emit('chat',{message:$('#chatText').val()
                    })
                    }
                    $('#chatText').val('')
               })

        })
});