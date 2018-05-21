<?php
defined('BASEPATH') OR exit('No direct script access allowed!');
use \QCloud_WeApp_SDK\Mysql\Mysql as DB;

class HaveBooked extends CI_Controller {
    public function index(){
        $json = file_get_contents("php://input"); 
        $obj = json_decode($json);
        $row =  DB::row('Book_Person', ['*'], ['OpenId'=>$obj->{'openId'}]);
        if ($row==NULL)
        {
            $this->json([
                'code'=> 0,
                'data'=>[],
            ]); 
        } else {
            if ($row->{'State'}==0)
            {
                $this->json([
                    'code'=> -1,
                    'data'=>$row,
                ]);
            } else {
                $this->json([
                    'code'=> 1,
                    'data'=>$row,
                ]); 
            }
        }
        
    }
}