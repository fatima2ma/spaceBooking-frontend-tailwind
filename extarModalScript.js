
        eventExtrasbtn();
        handleSelectExtras();
        function eventExtrasbtn(){
                const btn = document.querySelectorAll('.extraseervices');
                [...btn].map(elem => elem.addEventListener('click', () => {
                    // defineBookedExras(btn.dataset.booked); //review this
                    document.querySelector('#extras-overlay').classList.toggle('hidden');
                    console.log('click');
                })
            )}
            function defineBookedExras(booked){
                var bookedElems = document.querySelectorAll('.extra_elem[data-booked="true"]');
                bookedElems.forEach(service => {
                    service.classList.add('booked');
                    });
            }
            function handleSelectExtras(){
                const extras_elems = document.querySelectorAll('.extra_elem');
                // console.log(extras_elems);
                extras_elems.forEach(extra => {
                    extra.addEventListener('click', toggleExtras)
                });
                document.querySelector('#extras-overlay .book_extra_btn').addEventListener('click', handleBookExtras);
                // .book_extra_btn
            }
            function toggleExtras(e){
                // e.preventDefault();
                if(checkParents(e.target,'extra_elem')) 
                    if(!checkParents(e.target,'extra_elem').classList.contains('booked')) 
                        checkParents(e.target,'extra_elem').classList.toggle('extras-selected');
                // console.log('extra click');
            }

            function handleBookExtras(elem){
                const extras_selected = document.querySelectorAll('.extras-selected');
                if(extras_selected.length<=0){
                    if(document.querySelector('.noselected-msg'))
                      document.querySelector('.noselected-msg').innerText = `please select at least one service`
                    else {
                        const noselected_msg  = document.createElement('div');
                        noselected_msg.innerText = `please select at least one service`;
                        noselected_msg.classList.add('noselected-msg');
                        document.querySelector('#extras-overlay .model-foter').appendChild(noselected_msg);
                    }
                }else{
                    let extrasselected = [];
                    if(document.querySelector('.noselected-msg'))
                       document.querySelector('.noselected-msg').parentElement.removeChild(document.querySelector('.noselected-msg'))
                    extras_selected.forEach(extra => {
                        extrasselected.push(extra.dataset.name);
                    });
                }
                // return list of extarServices selected
            }