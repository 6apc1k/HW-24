var model = {
    currentPerson: {},
    allPersons: [{
            name: 'Lily Butler',
            score: 2,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
        },
        {
            name: 'Waller Perry',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
        },
        {
            name: 'Tammi Donovan',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
        },
        {
            name: 'Doreen Flowers',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
        },
        {
            name: 'Price Pace',
            score: 2,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
        },
        {
            name: 'Larson Maldonado',
            score: 1,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
        },
        {
            name: 'Berg Bolton',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
        },
        {
            name: 'Mack Lott',
            score: 3,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
        },
        {
            name: 'Rosanna Mcleod',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
        },
        {
            name: 'Rosalie Rice',
            score: 1,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
        },
        {
            name: 'Virginia Buchanan',
            score: 2,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
        },
        {
            name: 'Lorna Stein',
            score: 4,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
        },
        {
            name: 'Rosalie Steele',
            score: 3,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
        },
        {
            name: 'Wilcox Boyd',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
        },
        {
            name: 'Ollie Rice',
            score: 5,
            photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
        }
    ]
};

var control = {
    init: function() {
        listView.init();
        listView.render();

        scoresView.init();
        scoresView.render();

        profileView.init();

        controlsView.init();
        controlsView.render();
    },
    getAllNames: function() {
        var names = [];
        model.allPersons.forEach(function(item) {
            names.push(item.name);
        });
        return names;
    },
    getAllScores: function() {
        var scores = [];
        model.allPersons.forEach(function(item) {
            scores.push(item.score);
        });
        return scores;
    },
    setCurrentPerson: function(index) {
        model.currentPerson = model.allPersons[index];
        this.viewCurrentProfile();
    },
    getCurrentPerson: function() {
        return model.currentPerson;
    },
    viewCurrentProfile: function() {
        profileView.render();
    },
    setCurrentPersonScore: function(value) {
        model.currentPerson.score = value;
        profileView.render();
        scoresView.render();
    }
};

var listView = {
    init: function() {
        this.$container = $('.names');
        this.handleClicks();
    },
    render: function() {
        var listStr = '';
        control.getAllNames().forEach(function(name) {
            listStr += '<li>' + name + '</li>';
        });
        this.$container.html(listStr);
        var info = '<p id="info"></p>';
        $('body').append(info);
    },
    handleClicks: function() {
        this.$container.on('click', 'li', function(e) {
            var currentIndex = $(e.target).index();
            control.setCurrentPerson(currentIndex);
        });
    }
};


var scoresView = {
    init: function() {
        this.$container = $('.scores');
        this.handleClicks();
    },
    render: function() {
        var listStr = '';
        control.getAllScores().forEach(function(score) {
            listStr += '<li>' +
                '  <span>' + score + '</span>' +
                '  <input class="hidden score-input" type="text" value="' + score + '">' +
                '</li>';
        });
        this.$container.html(listStr);
    },
    handleClicks: function() {
        this.$container.on('click', 'li', function(e) {
            var $currentLi = $(e.target);
            var $currentSpan = $currentLi.find('span');
            var $currentInput = $currentLi.find('input.score-input');
            var currentIndex = $currentLi.index();
            if (!$currentInput.is('.hidden')) {
                return false;
            }
            control.setCurrentPerson(currentIndex);
            $currentSpan.addClass('hidden');
            $currentInput.removeClass('hidden').focus();
        });
        this.$container.on('focusout .score-input', function(e) {
            var newScore = $(e.target).val();
            control.setCurrentPersonScore(newScore);
        });
    }
};


var profileView = {
    init: function() {
        this.$container = $('.profile');
    },
    render: function() {
        var currentPerson = control.getCurrentPerson();
        var tempalte = '<img src="' + currentPerson.photoUrl + '">' +
            '<h3>' + currentPerson.name + '</h3>' +
            '<p>Score: ' + currentPerson.score + '</p>';
        this.$container.html(tempalte);
        $('#info').html(`Selected person is <span>${currentPerson.name}</span>. Person's score is: ${currentPerson.score}`);
        $('#info span').css('font-weight', 'bold');
    }
};

var controlsView = {
    init: function() {
        var container = '<ul id="controls"></ul>';
        $('.wrapper').prepend(container);        
    },
    render: function() {
        var controls = $('#controls');
        var listStr = [];
        for (var i = 0; i < model.allPersons.length; i++) {
            listStr.push(`<li id="${i}"><span class="up-arrow"></span><span class="up-after"></span><span class="down-arrow"></span><span class="down-after"></span></li>`);
          
        }
        controls.html(listStr);
        this.handleClicks();
        return listStr
    },
    swapElements: function (x, y) {
        var b = model.allPersons[y];
        model.allPersons[y] = model.allPersons[x];
        model.allPersons[x] = b;
    },
    handleClicks: function() {     
        $('.up-after').each(function() {
            $(this).click(function() {
                var l = +$(this).parent().attr('id');
                    if (l === 0) {
                        return;
                    }                
                controlsView.swapElements(l, l - 1);
                listView.render();
                scoresView.render();
            });
        });
        
        $('.down-after').each(function() {
            $(this).click(function() {
                    var l = +$(this).parent().attr('id');
                    if (l ===  model.allPersons.length - 1) {
                        return;
                    }
                    controlsView.swapElements(l, l + 1);
                    listView.render();
                    scoresView.render();
            });
        });        
    }
};

control.init();