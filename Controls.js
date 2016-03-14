function controls() {

    var abstractFlag = true, defectFlag = true, viewFlag = true, clickOutside = false;

    $('#grid-btn').click( function() {
        $('#grid-btn').toggleClass('highlight');
        $('#grid-btn i').toggleClass('icon-highlight');
        for ( var i = 0; i < monitors.length; ++i ) {
            monitors[i].toggleGrid();
        }
    });

    $('#stats-btn').click( function() {
        $('#stats-btn').toggleClass('highlight');
        $('#stats-btn i').toggleClass('icon-highlight');
        for ( var i = 0; i < monitors.length; ++i ) {
            monitors[i].toggleStats();
        }
    });

    $('#reset-btn').mousedown( function() {
        $('#reset-btn i').addClass('icon-highlight');
    });

    $('#reset-btn').mouseup( function() {
        $('#light-btn').removeClass('highlight');
        $('#light-btn i').removeClass('icon-highlight');
        view();
        $('#reset-btn i').removeClass('icon-highlight');
    });

    $('#light-btn').click( function() {
        $('#light-btn').toggleClass('highlight');
        $('#light-btn i').toggleClass('icon-highlight');
        for ( var i = 0; i < monitors.length; ++i ) {
            monitors[i].toggleLight();
        }
    });

    $('#label-btn').click( function() {
        $('#label-btn').toggleClass('highlight');
        $('#label-btn i').toggleClass('icon-highlight');
        for ( var i = 0; i < monitors.length; ++i ) {
            monitors[i].toggleLabels();
        }
    });

    $('#normal').click( function() {
        $('#normal-icon').removeClass('fa fa-heart');
        $('#normal-icon').addClass('fa fa-heartbeat');
        $('#normal-icon').addClass('icon-highlight');
        setTimeout(function() {
            $('#normal-icon').removeClass('fa fa-heartbeat');
            $('#normal-icon').addClass('fa fa-heart');
            $('#normal-icon').removeClass('icon-highlight');
            normalFlag = true;
        }, 250)
    });

    $('#defect').click( function() {
        if ( defectFlag ) {
            $('#defects-panel').css('z-index', 10);
            $('#defect-icon').removeClass('fa fa-folder');
            $('#defect-icon').addClass('fa fa-folder-open-o');
            $('#defect-icon').addClass('icon-highlight');
            defectFlag = false;
        }
        else {
            closeDefectPanel();
        }
    });

    $('#info-btn').click( function() {
        if ( abstractFlag ) {
            $('#abstract-panel').css('z-index', 10);
            $('#info-btn').addClass('highlight');
            $('#info-btn i').addClass('icon-highlight');
            abstractFlag = false;
        }
        else {
            $('#abstract-panel').css('z-index', 0);
            $('#info-btn').removeClass('highlight');
            $('#info-btn i').removeClass('icon-highlight');
            document.getElementById('abstract-panel').scrollTop = 0;
            abstractFlag = true;
        }
    });

    $('#view-btn').click( function() {
        if (viewFlag) {
            $('#view-btn i').addClass('icon-highlight');
            $('#view_btn').addClass('highlight');
            $('#views').css('z-index', 10);
            viewFlag = false;
        }
        else {
            hideViews();
        }
    });

    $(document).mousedown( function (e) {
        if (!$('#views').is(e.target) && !$('#view-btn').is(e.target)
                    && $('#views').has(e.target).length === 0) {
            hideViews()
        }
    });

    $('#view-external').click( function() {view(0); hideViews()});
    $('#view-dorsal').click( function() {view(1); hideViews()});
    $('#view-ventral').click( function() {view(2); hideViews()});
    $('#view-bottom').click( function() {view(3); hideViews()});
    $('#view-top').click( function() {view(4); hideViews()});
    $('#view-left').click( function() {view(5); hideViews()});
    $('#view-right').click( function() {view(6); hideViews()});

    function view(n) {
        for (var i = 0; i < monitors.length; ++i) {
            monitors[i].toggleCrossSection(n);
        }
    }
    function hideViews() {
        $('#view-btn i').removeClass('icon-highlight');
        $('#view_btn').removeClass('highlight');
        $('#views').css('z-index', 0);
        viewFlag = true;
    }

    $('#asd').click( function() {
        document.getElementById('defect').innerHTML = document.getElementById('title-asd').innerHTML;
        document.getElementById('abstract-panel').innerHTML = document.getElementById('info-asd').innerHTML;
        view(0);
        monitors[1].loadNewModel( models.atrialSeptal );
        closeDefectPanel();
    });
    $('#vsd').click( function() {
        document.getElementById('defect').innerHTML = document.getElementById('title-vsd').innerHTML;
        document.getElementById('abstract-panel').innerHTML = document.getElementById('info-vsd').innerHTML;
        view(0);
        monitors[1].loadNewModel( models.ventricularSeptal );
        closeDefectPanel();
    });
    $('#avsd').click( function() {
        document.getElementById('defect').innerHTML = document.getElementById('title-avsd').innerHTML;
        document.getElementById('abstract-panel').innerHTML = document.getElementById('info-avsd').innerHTML;
        view(0);
        monitors[1].loadNewModel( models.atrioventricularSeptal );
        closeDefectPanel();
    });
    $('#pda').click( function() {
        document.getElementById('defect').innerHTML = document.getElementById('title-pda').innerHTML;
        document.getElementById('abstract-panel').innerHTML = document.getElementById('info-pda').innerHTML;
        view(0);
        monitors[1].loadNewModel( models.patentDuctus );
        closeDefectPanel();
    });
    $('#tof').click( function() {
        document.getElementById('defect').innerHTML = document.getElementById('title-tof').innerHTML;
        document.getElementById('abstract-panel').innerHTML = document.getElementById('info-tof').innerHTML;
        view(0);
        monitors[1].loadNewModel( models.tetrology );
        closeDefectPanel();
    });

    function closeDefectPanel() {
        $('#defects-panel').css('z-index', 0);
        $('#defect-icon').removeClass('fa fa-folder-open-o');
        $('#defect-icon').addClass('fa fa-folder');
        $('#defect-icon').removeClass('icon-highlight');
        document.getElementById('abstract-panel').scrollTop = 0;
        document.getElementById('defects-panel').scrollTop = 0;
        defectFlag = true;
    }
}
