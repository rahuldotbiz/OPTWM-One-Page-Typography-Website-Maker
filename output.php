<?php
// for the page title
$PageTitle = $_GET['form-title'];
// the styling options
$TextColor = $_GET['form-textcolor'];
$BgColor = $_GET['form-bgcolor'];
$Font = $_GET['form-font'];
$FontFamily;
$GoogleUrl = "";
// this assigns the font family
switch ($Font) {
  case 'sans':
    $FontFamily = 'sans-serif';
    break;
    case 'serif':
      $FontFamily = 'serif';
      break;
      case 'monospace':
        $FontFamily = 'monospace';
        break;
        case 'system-ui':
          $FontFamily = 'system-ui';
          break;
          case 'worksans':
            $GoogleUrl ='https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap';
            $FontFamily = '"Work Sans", sans-serif';
            break;
            case 'plexsans':
              $GoogleUrl ='https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,700,700i';
              $FontFamily = '"IBM Plex Sans", sans-serif';
              break;
              case 'plexmono':
                $GoogleUrl ='https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i,700,700i';
                $FontFamily = '"IBM Plex Mono", sans-serif';
                break;
                case 'plexserif':
                  $GoogleUrl ='https://fonts.googleapis.com/css?family=IBM+Plex+Serif:400,400i,700,700i';
                  $FontFamily = '"IBM Plex Serif", serif';
                  break;
                  case 'plexsanscondensed':
                    $GoogleUrl ='https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:400,400i,700,700i';
                    $FontFamily = '"IBM Plex Sans Condensed", sans-serif';
                    break;
                    case 'montserrat':
                      $GoogleUrl ='https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i';
                      $FontFamily = '"Montserrat", sans-serif';
                      break;
                      case 'spacemono':
                        $GoogleUrl ='https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i';
                        $FontFamily = '"Space Mono", monospace';
                        break;
                        case 'ebgaramond':
                          $GoogleUrl ='https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i';
                          $FontFamily = '"EB Garamond", serif';
                          break;
                          case 'playfairdisplay':
                            $GoogleUrl ='https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i&display=swap';
                            $FontFamily = '"Playfair Display", serif';
                            break;
                            case 'poppins':
                              $GoogleUrl ='https://fonts.googleapis.com/css?family=Poppins:400,400i,700,700i&display=swap';
                              $FontFamily = '"Poppins", sans-serif';
                              break;
                              case 'domine':
                                $GoogleUrl ='https://fonts.googleapis.com/css?family=Domine:400,700&display=swap';
                                $FontFamily = '"Domine", serif';
                                break;
                                case 'livvic':
                                  $GoogleUrl ='https://fonts.googleapis.com/css?family=Livvic:400,400i,700,700i&display=swap';
                                  $FontFamily = '"Livvic", serif';
                                  break;
                                  case 'vidaloka':
                                    $GoogleUrl ='https://fonts.googleapis.com/css?family=Vidaloka&display=swap';
                                    $FontFamily = '"Vidaloka", serif';
                                    break;
                                    case 'karla':
                                      $GoogleUrl ='https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap';
                                      $FontFamily = '"Karla", serif';
                                      break;
                                      case 'arimo':
                                        $GoogleUrl ='https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,700;1,400;1,700&display=swap';
                                        $FontFamily = '"Arimo", sans-serif';
                                        break;
                                        case 'chivo':
                                          $GoogleUrl ='https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,400;0,700;1,400;1,700&display=swap';
                                          $FontFamily = '"Chivo", sans-serif';
                                          break;
                                          case 'ovo':
                                            $GoogleUrl ='https://fonts.googleapis.com/css2?family=Ovo&display=swap';
                                            $FontFamily = '"Ovo", serif';
                                            break;
  default:
    // code...
    break;
}
// for italics or Bold
$FontWeight = "normal";
if (isset($_GET['form-bold'])) {
  $FontWeight = "bold";
}
$FontStyle = "normal";
if (isset($_GET['form-italic'])) {
  $FontStyle= "italic";
}
// for size
$FontSize= $_GET['form-fontsize'];
// this variable will be used to put the page contents
$PageContent = $_GET['form-content-h1']."<br>";
for ($i=1; $i < count($_GET['form-content-p']); $i++) {
  // this loop checks if an iput has text and then appends to the variable for content
  if($_GET['form-content-p'][$i] != ""){
    $PageContent .= $_GET['form-content-p'][$i]."<br>";
  }
}
// the markup and the contents
$Html = "<!DOCTYPE html>
        <html lang='en' dir='ltr'>
          <head>
            <meta charset='utf-8'>
            <title>".$PageTitle."</title>
            <style>
            @import url(".$GoogleUrl.");
              body, html{
                padding:0;
                margin:0;
                background:".$BgColor.";
                color:".$TextColor.";
                font-family:".$FontFamily.";
                font-size:".$FontSize."vw;
                font-weight:".$FontWeight.";
                font-style:".$FontStyle.";
              }
            </style>
          </head>
          <body>
            ".$PageContent."
          </body>
        </html>";
        $Content= $Html;
        // lets create a file;
        $NewFile = fopen("index.html","w");
        // lets write
        fwrite($NewFile, $Content);
        // lets close
        fclose($NewFile);
        echo "<script>
        var AnchorTag = document.createElement('a');
        AnchorTag.href = 'index.html';
        AnchorTag.setAttribute('download','index.html');
        AnchorTag.click();
        </script>";
?>
