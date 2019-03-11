var nextPageToken = '';
var oldPageToken = '';
$(document).ready(function(){

    $('#btnAdd').on('click',function(e){
        var query = $('#item-name').val();
        e.preventDefault();
        searchVideos(query, '');
    });
  });
$(document).on("click", 'img', function() {
    var idVideo = $(this).closest('li').find('#videoTitle').attr('idVideo');
    console.log(idVideo);
    window.open('https://www.youtube.com/watch?v='+idVideo, '_blank');
});
$(document).on("click", '#btnNext', function() {
    var query = $('#item-name').val();
    searchVideos(query, nextPageToken);
});
$(document).on("click", '#btnPrevious', function() {
    nextPageToken = oldPageToken;
    if($('ul#item-list li').length >= 1)
        $('ul > li').slice(-10).remove();
    if($('ul#item-list li').length < 1) {
        $('#btnPrevious').css('display','none');
        $('#btnNext').css('display','none');
    }
});
function appendContent(results){
    for(var i in results.items) {
        var item = results.items[i];
        var strItem = "<li style='margin:10px;'><div style='border: 1px solid gray; padding:20px;'>" 
        + "<div id='videoTitle' style='margin-botom:20px;' idVideo="+item.id.videoId+">" + item.snippet.title + "</div>"
        + "<div style='padding-botom:20px;'><img src='" + item.snippet.thumbnails.medium.url + "'></img></div>"
        +"</div></li>";
        $('#item-list').append(strItem);
    }
    nextPageToken = results.nextPageToken;
}
function searchVideos(query, strPage) {
    if(strPage != ''){
        oldPageToken = strPage;
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            method: 'GET',
            data: {
                key: 'AIzaSyAwYPNipVUJmugrjpmGsM8jrO-MYC2wMc0',
                part: 'snippet',
                order: 'viewCount',
                q: query,
                type: 'video',
                maxResults: '10',
                pageToken: strPage
            },
            dataType: "json",
            success: myJson => appendContent(myJson),
            error: error => alert(error)
        });
    }
    else {
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            method: 'GET',
            data: {
                key: 'AIzaSyAwYPNipVUJmugrjpmGsM8jrO-MYC2wMc0',
                part: 'snippet',
                order: 'viewCount',
                q: query,
                type: 'video',
                maxResults: '10'
            },
            dataType: "json",
            success: myJson => appendContent(myJson),
            error: error => alert(error)
        });
        $('#btnPrevious').css('display','inline-block');
        $('#btnNext').css('display','inline-block');
    }
}