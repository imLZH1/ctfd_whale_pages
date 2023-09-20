CTFd._internal.challenge.data = undefined;

// TODO: Remove in CTFd v4.0
CTFd._internal.challenge.renderer = null;

CTFd._internal.challenge.preRender = function() {};

// TODO: Remove in CTFd v4.0
CTFd._internal.challenge.render = null;

CTFd._internal.challenge.postRender = function() {};


function me_alert_close(){


    //<div x-data="" id="modal_alert">
    document.getElementById('modal_alert').innerHTML = (`<div class="modal" x-ref="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" x-text="$store.modal.title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p x-html="$store.modal.html"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Got it!</button>
        </div>
      </div>
    </div>
  </div>`);
}









function me_alert(title,body,button){


    //<div x-data="" id="modal_alert">
    document.getElementById('modal_alert').innerHTML = (`<div class="modal show" x-ref="modal" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" x-text="$store.modal.title">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p x-html="$store.modal.html"><p>${body}</p></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="me_alert_close()">${button}</button>
            </div>
          </div>
        </div>
      </div><div class="modal-backdrop show"></div>`);
    //</div>


}


function loadInfo() {
    //var challenge_id = $('#challenge-id').val();
    var challenge_id = parseInt(CTFd.lib.$("#challenge-id").val());
    //var url = "/api/v1/plugins/ctfd-whale/container?challenge_id=" + challenge_id;
    //
    //document.getElementById('whale-button-boot').innerHTML = "Waiting...";
    //document.getElementById('whale-button-boot').disabled = true;
    var url = "/api/v1/plugins/ctfd-whale/container?challenge_id=" + challenge_id;

    var params = {};

    CTFd.fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.status === 429) {
            // User was ratelimited but process response
            return response.json();
        }
        if (response.status === 403) {
            // User is not logged in or CTF is paused.
            return response.json();
        }
        return response.json();
    }).then(function (response) {
        if (window.t !== undefined) {
            clearInterval(window.t);
            window.t = undefined;
        }
        if (response.success) response = response.data;
        else me_alert(
            "Fail",
            response.message,
            "OK"
        );
        if (response.remaining_time === undefined) {
            document.getElementById('whale-panel').innerHTML = ('<div class="card" style="width: 100%;">' +
                '<div class="card-body">' +
                '<h5 class="card-title">Instance Info</h5>' +
                '<button type="button" class="btn btn-primary card-link" id="whale-button-boot" ' +
                '        onclick="CTFd._internal.challenge.boot()">' +
                'Launch an instance' +
                '</button>' +
                '</div>' +
                '</div>');
        } else {
            document.getElementById('whale-panel').innerHTML = (
                `<div class="card" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title">Instance Info</h5>
                        <h6 class="card-subtitle mb-2 text-muted" id="whale-challenge-count-down">
                            Remaining Time: ${response.remaining_time}s
                        </h6>
                        <h6 class="card-subtitle mb-2 text-muted">
                            Lan Domain: ${response.lan_domain}
                        </h6>
                        <p id="user-access" class="card-text"></p>
                        <button type="button" class="btn btn-danger card-link" id="whale-button-destroy"
                                onclick="CTFd._internal.challenge.destroy()">
                            Destroy this instance
                        </button>
                        <button type="button" class="btn btn-success card-link" id="whale-button-renew"
                                onclick="CTFd._internal.challenge.renew()">
                            Renew this instance
                        </button>
                    </div>
                </div>`
            );
            document.getElementById('user-access').innerHTML = (response.user_access);

            function showAuto() {
                //const c = $('#whale-challenge-count-down')[0];
                const c = document.getElementById('whale-challenge-count-down');
                if (c === undefined) return;
                const origin = c.innerHTML;
                const second = parseInt(origin.split(": ")[1].split('s')[0]) - 1;
                c.innerHTML = 'Remaining Time: ' + second + 's';
                if (second < 0) {
                    loadInfo();
                }
            }

            window.t = setInterval(showAuto, 1000);
        }
    });
};

CTFd._internal.challenge.destroy = function () {
    //var challenge_id = $('#challenge-id').val();
    var challenge_id = parseInt(CTFd.lib.$("#challenge-id").val());
    var url = "/api/v1/plugins/ctfd-whale/container?challenge_id=" + challenge_id;

    
    document.getElementById('whale-button-destroy').innerHTML = "Waiting...";
    document.getElementById('whale-button-destroy').disabled = true;

    var params = {};

    CTFd.fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status === 429) {
            // User was ratelimited but process response
            return response.json();
        }
        if (response.status === 403) {
            // User is not logged in or CTF is paused.
            return response.json();
        }
        return response.json();
    }).then(function (response) {
        if (response.success) {
            loadInfo();
            me_alert(
                "Success",
               "Your instance has been destroyed!",
                "OK"
            );
        } else {
            $('#whale-button-destroy')[0].innerHTML = "Destroy this instance";
            $('#whale-button-destroy')[0].disabled = false;
            me_alert(
                "Fail",
                response.message,
                "OK"
            );
        }
    });
};

CTFd._internal.challenge.renew = function () {
    var challenge_id = parseInt(CTFd.lib.$("#challenge-id").val());
    //var challenge_id = $('#challenge-id').val();
    var url = "/api/v1/plugins/ctfd-whale/container?challenge_id=" + challenge_id;

    //$('#whale-button-renew')[0].innerHTML = "Waiting...";
    //$('#whale-button-renew')[0].disabled = true;
    document.getElementById('whale-button-renew').innerHTML = "Waiting...";
    document.getElementById('whale-button-renew').disabled = true;

    var params = {};

    CTFd.fetch(url, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status === 429) {
            // User was ratelimited but process response
            return response.json();
        }
        if (response.status === 403) {
            // User is not logged in or CTF is paused.
            return response.json();
        }
        return response.json();
    }).then(function (response) {
        if (response.success) {
            loadInfo();
            me_alert(
                "Success",
               "Your instance has been renewed!",
                "OK"
            );
        } else {
            //$('#whale-button-renew')[0].innerHTML = "Renew this instance";
            //$('#whale-button-renew')[0].disabled = false;
            document.getElementById('whale-button-renew').innerHTML = "Renew this instance";
            document.getElementById('whale-button-renew').disabled = false;
            me_alert(
                "Fail",
                response.message,
                "OK"
            );
        }
    });
};

CTFd._internal.challenge.boot = function () {
    //var challenge_id = $('#challenge-id').val();
    var challenge_id = parseInt(CTFd.lib.$("#challenge-id").val());
    var url = "/api/v1/plugins/ctfd-whale/container?challenge_id=" + challenge_id;

    // $('#whale-button-boot')[0].innerHTML = "Waiting...";
    // $('#whale-button-boot')[0].disabled = true;
    //$('#whale-button-boot').innerHTML = "Waiting...";
    document.getElementById('whale-button-boot').innerHTML = "Waiting...";
    document.getElementById('whale-button-boot').disabled = true;

    var params = {};

    CTFd.fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status === 429) {
            // User was ratelimited but process response
            return response.json();
        }
        if (response.status === 403) {
            // User is not logged in or CTF is paused.
            return response.json();
        }
        return response.json();
    }).then(function (response) {
        if (response.success) {
            loadInfo();
            me_alert(
                "Success",
                "Your instance has been deployed!",
                "OK"
            );
        } else {
            document.getElementById('whale-button-boot').innerHTML = "Launch an instance";
            document.getElementById('whale-button-boot').disabled = false;
            //document.getElementById('whale-button-boot')[0];
            me_alert(
                "Fail",
                response.message,
                "OK"
            );
        }
    });
};

CTFd._internal.challenge.submit = function(preview) {
  var challenge_id = parseInt(CTFd.lib.$("#challenge-id").val());
  var submission = CTFd.lib.$("#challenge-input").val();

  var body = {
    challenge_id: challenge_id,
    submission: submission
  };
  var params = {};
  if (preview) {
    params["preview"] = true;
  }

  return CTFd.api.post_challenge_attempt(params, body).then(function(response) {
    if (response.status === 429) {
      // User was ratelimited but process response
      return response;
    }
    if (response.status === 403) {
      // User is not logged in or CTF is paused.
      return response;
    }
    return response;
  });
};


//var challenge_id = parseInt(CTFd.lib.$("#challenge-id").val());

async function sleep(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function Open_Challenge() {
    console.log('Start');
    await sleep(200);
    loadInfo();
}

Open_Challenge();

//alert(c.id);

//CTFd._internal.challenge.submit = function (preview) {
//    var challenge_id = $('#challenge-id').val();
//    var submission = $('#challenge-input').val()
//
//    var body = {
//        'challenge_id': challenge_id,
//        'submission': submission,
//    }
//    var params = {}
//    if (preview)
//        params['preview'] = true
//
//    return CTFd.api.post_challenge_attempt(params, body).then(function (response) {
//        if (response.status === 429) {
//            // User was ratelimited but process response
//            return response
//        }
//        if (response.status === 403) {
//            // User is not logged in or CTF is paused.
//            return response
//        }
//        return response
//    })
//};
