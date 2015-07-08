package KeystoneConnect;
use Mojo::Base 'Mojolicious';

# This method will run once at server start
sub startup {
  my $self = shift;

  # Documentation browser under "/perldoc"
  $self->plugin('PODRenderer');
  $self->plugin(JSONP => callback => 'callback');
  
  # Router
  my $r = $self->routes;

  # Normal route to controller
  #$r->get('/')->to('example#welcome');
  $r->get('/')->to(cb => sub { shift->redirect_to('/index.html') });

  $r->get('/videocall/#name/#email')->to(cb => sub {
    my $c = shift;
    my $me = {
      name => 'Scott Travis',
      email => 'stravis@keystone-technologies.com',
      room => 'scotttravis',
    };
    my $name = $c->param('name');
    my $email = $c->param('email');
    my $sendgrid_api = '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';
    my $sendgrid = {
      to => $email,
      toname => $name,
      from => "$me->{email}",
      fromname => "$me->{name}",
      subject => "Incoming Video Call from $me->{name}",
      html => "Hello, $name!  $me->{name} is wanting to talk with you.  <a href='http://appear.in/$me->{room}'>Click here to connect.</a>",
    };
    $c->app->log->info($c->dumper(["https://api.sendgrid.com/api/mail.send.json" => {Authorization => "Bearer $sendgrid_api"} => form => $sendgrid]));
    $c->render_later;
    $c->ua->post("https://api.sendgrid.com/api/mail.send.json" => {Authorization => "Bearer $sendgrid_api"} => form => $sendgrid => sub {
      my ($ua, $tx) = @_;
      say $tx->res->body;
      $c->render(json => $tx->res->json);
    });
  });

  $r->any('/api/grid/:page')->to(cb => sub {
    my $c = shift;
    my $img = 'img/TwitterAppIcon.png';
    my $label = 'twitter';
    my $url = 'http://twitter.com';
    if ( $c->param('page') == 1 ) {
      $img = 'img/FacebookAppIcon.png';
      $label = 'facebook';
      $url = 'http://facebook.com';
    } elsif ( $c->param('page') == 2 ) {
      $img = 'img/YouTubeAppIcon.png';
      $label = 'youtube';
      $url = 'http://youtube.com';
    } elsif ( $c->param('page') == 3 ) {
      $img = 'img/SpotifyAppIcon.png';
      $label = 'spotify';
      $url = 'http://spotify.com';
    }
    $c->render_jsonp([
      {"col"=>1,"row"=>1,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>3,"row"=>2,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>2,"row"=>3,"size_x"=>2,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>3,"row"=>1,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>5,"row"=>2,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>4,"row"=>3,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>6,"row"=>1,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>1,"row"=>3,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>9,"row"=>3,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>7,"row"=>1,"size_x"=>2,"size_y"=>2,img=>$img,label=>$label,url=>$url},
      {"col"=>6,"row"=>2,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>7,"row"=>3,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>9,"row"=>1,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>4,"row"=>2,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>6,"row"=>3,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>5,"row"=>1,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>1,"row"=>2,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>5,"row"=>3,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>4,"row"=>1,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>2,"row"=>2,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>8,"row"=>3,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>2,"row"=>1,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>9,"row"=>2,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url},
      {"col"=>1,"row"=>4,"size_x"=>1,"size_y"=>1,img=>$img,label=>$label,url=>$url}
    ]);
  });
}

1;
