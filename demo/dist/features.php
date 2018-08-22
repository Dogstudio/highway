<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
</head>
<body>
    <main class="site-container">
        <?php include('./parts/header.php'); ?>

        <article class="site-content" data-router-view="features">
            <h1>Features</h1>
            <p>Lorem ipsum <strong>dolor sit amet consectetur</strong>, adipisicing elit. Ex commodi aperiam non eum, ratione perspiciatis dolorem facilis, aspernatur magnam dolorum animi maiores corrupti, excepturi blanditiis repellendus. Provident molestias esse autem!</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quaerat magni vero cupiditate temporibus ipsam! Illum praesentium fugit cupiditate deserunt? Quisquam aperiam adipisci accusamus dolorum soluta laboriosam asperiores laborum unde!</p>

            <h2 id="renderers">Renderers</h2>
            <p>Lorem ipsum <em>dolor sit amet consectetur</em>, adipisicing elit. <a href="#">Ex commodi aperiam</a> non eum, ratione perspiciatis dolorem facilis, aspernatur magnam dolorum animi maiores corrupti, excepturi blanditiis repellendus. Provident molestias esse autem!</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quaerat magni vero cupiditate temporibus ipsam! Illum praesentium fugit cupiditate deserunt? Quisquam aperiam adipisci accusamus dolorum soluta laboriosam asperiores laborum unde!</p>
            <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
            </ul>

            <h2 id="transitions">Transitions</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex commodi aperiam non eum, ratione perspiciatis dolorem facilis, aspernatur magnam dolorum animi maiores corrupti, excepturi blanditiis repellendus. Provident molestias esse autem!</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore quaerat magni vero cupiditate temporibus ipsam! Illum praesentium fugit cupiditate deserunt? Quisquam aperiam adipisci accusamus dolorum soluta laboriosam asperiores laborum unde!</p>
            <ol>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
            </ol>
            <h3>Lorem</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi dignissimos hic, dolorum architecto suscipit porro voluptatibus minima magnam inventore blanditiis laborum ratione. Quisquam ad dolorem adipisci dicta, accusantium qui debitis?</p>

            <?php include('./snippets/function.php'); ?>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th>Heading</th>
                    <th>Heading</th>
                    <th>Heading</th>
                    <th>Heading</th>
                </tr>
                <tr>
                    <td>Lorem ipsum</td>
                    <td>Lorem ipsum</td>
                    <td>Lorem ipsum</td>
                    <td>✅</td>
                </tr>
            </table>

            <img src="//placehold.it/1920x1080" alt="" />
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>

