<?php
session_start();

require_once 'components/header.php';

$metaImport = simplexml_load_file("output/meta.xml") or die("Error: Cannot create object");
?>
<div class="container">
    <h1>Overview - ENMA 600</h1>

    <div class="container">
        <div class="row">
            <h3>Modules</h3>
            <div id="accordion">
                <div class="card">
                    <div class="card-header row" id="headingOne">
                        <h5 class="mb-0 col metaTitle">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">
                                <?php echo $metaImport->project['title'];?>
                            </button>
                        </h5>
                        <p class="col float-right metaDuration"><?php echo $metaImport->project['duration']?></p>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            This is where a description of the module would be housed. All this could be stored in a database and fetched as needed. Currently this is static text. The link to access the module content is <a href="src/output/story_html5.html" target="_blank">here</a>.
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="false" aria-controls="collapseTwo">
                                Module 2
                            </button>
                        </h5>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div class="card-body">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere ipsam quidem, exercitationem, voluptatem tempora eum voluptatibus delectus minima nesciunt enim eaque sapiente maxime! Neque, eius asperiores nisi expedita voluptates laudantium.
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree"
                                aria-expanded="false" aria-controls="collapseThree">
                                Module 3
                            </button>
                        </h5>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div class="card-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, odio fugiat minus deleniti fuga perferendis labore voluptate tempore reiciendis aut praesentium modi maiores dolores soluta beatae quis nobis ut maxime.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <h3>Assignments</h3>
    <h3>Homework</h3>
    <div class="container">
        <div class="row">
            <div class="col">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique in perspiciatis ut ipsa neque ea eum
                facere veniam voluptatem ipsam nesciunt eligendi sequi illo sed porro tempore quia, aspernatur minima?
            </div>
            <div class="col">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui quis ducimus eveniet tempora pariatur iste
                repellat aut nesciunt possimus error. Atque optio soluta quo cum eos? Error quae esse architecto.
            </div>
            <div class="col">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium omnis, fugit nemo in alias autem
                similique ratione enim modi magnam, ab dicta doloribus vero nesciunt aliquam suscipit dignissimos quae
                quidem.
            </div>
        </div>
    </div>

</div>
<?php
require_once 'components/footer.php';
?>