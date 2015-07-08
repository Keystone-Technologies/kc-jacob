
$(function () {
    $(".rss-feeds").rss("http://feeds.finance.yahoo.com/rss/2.0/headline?s=IBM&region=US&lang=en-US", {
        limit: 5,
        effect: 'slideFastSynced'
    });

    $(".keystone-rss").rss("http://rss.dev.kit.cm/events", {
        limit: 5,
        layoutTemplate: '<ul class="inline">{entries}</ul>',
        entryTemplate: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
    });


    $(".food-rss").rss("http://www.food.com/rssapi.do?page_type=26&slug=apples", {
        limit: 5,
        layoutTemplate: '<ul class="inline">{entries}</ul>',
        entryTemplate: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
    });

    $(".finance-rss").rss("http://feeds.finance.yahoo.com/rss/2.0/headline?s=IBM&region=US&lang=en-US", {
        limit: 5,
        effect: 'slideFastSynced'
    });

    $(".health-rss").rss("http://rss.cnn.com/rss/cnn_health.rss", {
        limit: 5,
        effect: 'slideFastSynced'
    });

    /* banner */
    $.get("http://rss.dev.kit.cm/ticker", function(data){
        if ( data.title ) {
            $(".breakingNews>.bn-title>h2").html(data.title);
            $(".breakingNews>ul").append('<li><a href="'+data.url+'">'+data.text+'</a></li>').show();
            $(".breakingNews>ul>li").show();
        }
    });
});