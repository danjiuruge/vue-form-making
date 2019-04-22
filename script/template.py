#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os, sys, re
import argparse
import getpass

FLAG = '###'
SHOW = '&&&'
MODEL_DICT = {}
TARGET_PATH = '/home/{}/athena/src/(api | views)/{}'
VIEW_PATH = '/home/{}/athena/src/views/{}'
API_PATH = '/home/{}/athena/src/api/{}'
MODEL_DIALOG_PATH = '/home/{}/vue-element-tool/script/model_dialog/{}'
MODEL_CARD_PATH = '/home/{}/vue-element-tool/script/model_card/{}'
COMMON_MODEL_PATH = '/home/{}/vue-element-tool/script/common/{}'
CUR_USER = getpass.getuser()
COMMON_DICT = {'index.js': '/index.js', 'temp.js': '/{}.js', 'index.vue': '/index.vue'}
PATH_DICT = {'index.js': API_PATH, 'temp.js': API_PATH, 'index.vue': VIEW_PATH}


def check():
    parser = argparse.ArgumentParser(description="生成以模块名为路径的文件夹")
    # 必填参数
    parser.add_argument('-name', help="模块名(英文)")
    parser.add_argument('-show', help="前端展示名(中文)")
    exptypegroup = parser.add_mutually_exclusive_group()
    # 互斥选项
    exptypegroup.add_argument('-dialog', help="Dialog模式", action="store_true")
    exptypegroup.add_argument('-card', help="Card模式", action="store_true")
    ARGS = parser.parse_args()
    if not ARGS.dialog and not ARGS.card:
        print("Dialog/Card模式二选一")
        sys.exit()
    if os.path.exists(VIEW_PATH.format(CUR_USER, ARGS.name)) or os.path.exists(API_PATH.format(CUR_USER, ARGS.name)):
        print("模块路径或API路径已存在，请更换")
        sys.exit()
    if ARGS.name.find('/') != -1:
        print("名称不能出现\"/\"")
        sys.exit()
    return ARGS

def oper(args):
    # 创建模块路径
    os.makedirs(VIEW_PATH.format(CUR_USER, args.name))
    # 创建API路径
    os.makedirs(API_PATH.format(CUR_USER, args.name))
    # 创建SRC/API相关
    for k, v in COMMON_DICT.iteritems():
        read_index = open(COMMON_MODEL_PATH.format(CUR_USER, k)).read()
        write_index = open(PATH_DICT[k].format(CUR_USER, args.name) + v.format(args.name), 'w')
        write_index.write(re.sub(FLAG, args.name, read_index))
    if args.dialog:
        _T = MODEL_DIALOG_PATH
    elif args.card:
        _T = MODEL_CARD_PATH
    # List.vue
    read_index = open(_T.format(CUR_USER, 'list.vue')).read()
    write_index = open(VIEW_PATH.format(CUR_USER, args.name) + '/{}List.vue'.format(args.name), 'w')
    write_index.write(re.sub(FLAG, args.name, read_index))
    # Upsert.vue
    read_index = open(_T.format(CUR_USER, 'upsert.vue')).read()
    write_index = open(VIEW_PATH.format(CUR_USER, args.name) + '/{}Upsert.vue'.format(args.name), 'w')
    write_index.write(re.sub(FLAG, args.name, read_index))
    if args.card:
        # Index.vue
        read_index = open(MODEL_CARD_PATH.format(CUR_USER, 'index.vue')).read()
        write_index = open(VIEW_PATH.format(CUR_USER, args.name) + '/{}Index.vue'.format(args.name), 'w')
        write_index.write(re.sub(SHOW, args.show, re.sub(FLAG, args.name, read_index)))
    print("已成功构建,产出的文件在{}下".format(TARGET_PATH.format(CUR_USER, args.name)))


def main():
    oper(check())

if __name__ == '__main__':
    main()
