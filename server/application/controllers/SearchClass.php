<?php
defined('BASEPATH') OR exit('No direct script access allowed!');
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class SearchClass extends CI_Controller {
    public function index(){
        $json = file_get_contents("php://input");
        $obj = json_decode($json);
        $this->json([
            'code'=>0,
            'data'=>[
                "monday"=>DB::row('Time_Table_0', ['*'],["place"=>$obj->{'place'}]),
                "tuesday"=>DB::row('Time_Table_1', ['*'],["place"=>$obj->{'place'}]),
                "wednessday"=>DB::row('Time_Table_2', ['*'],["place"=>$obj->{'place'}]),
                "thursday"=>DB::row('Time_Table_3', ['*'],["place"=>$obj->{'place'}]),
                "friday"=>DB::row('Time_Table_4', ['*'],["place"=>$obj->{'place'}]),
                "saturday"=>DB::row('Time_Table_5', ['*'],["place"=>$obj->{'place'}]),
                "sunday"=>DB::row('Time_Table_6', ['*'],["place"=>$obj->{'place'}])
            ]
        ]);
    }
}